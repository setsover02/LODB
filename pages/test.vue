<template>
  <div>
    <v-data-table :headers="charactersCol" :items="character" sort-by="id" class="elevation-1" single-select show-select>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
			<template v-slot:item.data-table-select>
				<v-btn icon @click="editItem(item)"><v-icon>mdi-face</v-icon></v-btn>
				<!-- <v-simple-checkbox @click="editItem(item)"></v-simple-checkbox> -->
			</template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-card max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-card class="radial-t200">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
							<span v-text="editedItem.name"></span>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.name" label="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.hit" label="hit"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.crit" label="crit"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.dodge" label="dodge"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.ap" label="ap"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      hit: 0,
      crit: 0,
      dodge: 0,
      ap: 0,
    },
    defaultItem: {
      name: '',
      hit: 0,
      crit: 0,
      dodge: 0,
      ap: 0,
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    ...mapState(['charactersCol']),
    ...mapGetters([
      'character' // json
    ])
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.$store.getters.character
    },

    editItem(item) {
      this.editedIndex = this.$store.getters.character.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.$store.getters.character.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.$store.getters.character.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.$store.getters.character[this.editedIndex], this.editedItem)
      } else {
        this.$store.getters.character.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>