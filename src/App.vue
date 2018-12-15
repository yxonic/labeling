<template>
  <div>
    <b-container class="bv-example-row">
      <b-table striped hover :items="names"></b-table>
      <!-- main list -->
      <b-btn v-b-modal.labelingModal>Launch demo modal</b-btn>
      <b-pagination align="center" size="md" :total-rows="100" :per-page="10">
      </b-pagination>
    </b-container>

    <!-- labeling form -->
    <b-modal id="labelingModal"
             centered
             ref="modal"
             title="Submit your name"
             size="lg"
             @ok="handleOk"
             @shown="initModal">
      <form @submit.stop.prevent="handleSubmit">
        <tags-input element-id="tags"
          ref="tags"
          :typeahead-max-results=6
          :only-existing-tags=true
          :existing-tags="{ 
              1: 'Web Development',
              2: 'PHP',
              3: 'JavaScript',
              4: 'Python',
              5: 'Machine Learning',
              6: '中文',
              7: '动态规划'
          }"
          :typeahead="true"></tags-input>
        <b-form-input type="text"
                      ref="input"
                      placeholder="Enter your name"
                      v-model="name"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      names: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  },
  methods: {
    initModal () {
      this.name = ''
      this.$refs.tags.$refs.taginput.focus()
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.name) {
        alert('Please enter your name')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.names.push({ isActive: true, age: 38, first_name: 'Duck', last_name: this.name})
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass">
.tags-input-root
  height: 80px;
</style>
