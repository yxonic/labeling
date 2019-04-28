<template>
  <div @click='loseFocus'>
    <b-container>
      <!-- instructions -->
      <b-jumbotron>
        <span v-html="instructions"></span>
      </b-jumbotron>

      <!-- main list -->
      <template>
        <div @click.stop>
          <b-table :fields="fields" :items="items"
              @row-clicked="edit">
            <template v-for="f in fields" :slot="f.key" slot-scope="row">
              <b-form-select v-if="row.item.edit && f.type == 'class'"
                  v-model="inputs[f.key]"
                  :options="f.choices" />
              <tags-input v-if="row.item.edit && f.type == 'tag'"
                  v-model="inputs[f.key]"
                  :existing-tags="f.choices"
                  :only-existing-tags="true"
                  :typeahead="true">
              </tags-input>
              <div v-if="f.type == 'text'" @click.stop='loseFocus'>
                {{row.item[f.key]}}
              </div>
              <div v-if="f.type == 'html'" @click.stop='loseFocus'>
                <span v-html="row.item[f.key]"></span>
              </div>
              <div v-if="f.type == 'code'" @click.stop='loseFocus'>
                <pre>{{row.item[f.key]}}</pre>
              </div>
              <div v-if="!row.item.edit && row.item[f.key] && f.type == 'class'">
                {{f.choices[row.item[f.key]]}}
              </div>
              <div v-if="!row.item.edit && row.item[f.key] && f.type == 'tag'">
                <b-badge v-for="tag in row.item[f.key]"
                    variant="light" :key="tag">
                  {{f.choices[tag]}}
                </b-badge>
              </div>
            </template>
          </b-table>
        </div>
      </template>

      <br>

      <!-- pagination -->
      <b-pagination-nav align="center"
          size="sm"
          :link-gen="pageLink"
          :limit=10
          :number-of-pages="nPages"
          v-model="currentPage" />
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      instructions: '',
      currentPage: 1,
      nPages: 1,

      fields: [],
      items: [],
      editing: -1,
      inputs: {}
    }
  },

  methods: {
    init () {
      const url = 'https://base.ustc.edu.cn/api/labeling/v1/' + this.$route.params.dataset
      this.axios.get(url).then((response) => {
        this.fields = response.data.fields
        this.instructions = response.data.instructions || response.data.fields
        for (var i in this.fields) {
          window.Vue.set(this.inputs, this.fields[i].key, '')
        }
      })
      this.axios.get(url + '/page/1').then((response) => {
        this.items = response.data.documents
        this.nPages = response.data.total
      })
    },
    pageLink (pageNum) {
      return '#'
    },
    edit (item, index) {
      if (this.editing < 0) {
        this.editing = index
        this.init_editing(index)
      }
      if (index != this.editing) {
          this.save_editing(this.editing)
          this.items[this.editing].edit = false
          this.editing = index
          this.init_editing(index)
      }
      window.Vue.set(this.items[this.editing], 'edit', true)
    },
    loseFocus () {
      if (this.editing < 0)
        return
      this.save_editing(this.editing)
      this.items[this.editing].edit = false
      this.editing = -1
    },
    init_editing (index) {
      for (var i in this.fields) {
        var field = this.fields[i].key
        this.inputs[field] = this.items[index][field]
      }
    },
    save_editing (index) {
      for (var i in this.fields) {
        var field = this.fields[i].key
        if (this.inputs[field])
          window.Vue.set(this.items[index], field, this.inputs[field])
        this.inputs[field] = ''
      }
      var id = this.items[index].id, item = {}
      for (var key in this.items[index]) {
        if (key == 'id' || key == 'edit')
          continue
        item[key] = this.items[index][key]
      }
      const url = 'https://base.ustc.edu.cn/api/labeling/v1/' + this.$route.params.dataset
      this.axios.put(url + id, item).then((response) => {})
    }
  },

  watch: {
    currentPage: function(page) {
      const url = 'https://base.ustc.edu.cn/api/labeling/v1/' + this.$route.params.dataset
      this.axios.get(url + '/page/' + page).then((response) => {
        this.items = response.data.documents
      })
    },
    '$route': function () {
      this.init()
    }
  },

  beforeMount(){
    this.init()
  }
}
</script>

<style lang="sass">
td
  max-width: 200px;
</style>
