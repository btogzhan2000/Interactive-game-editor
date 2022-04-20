<template>
    <div class="action_wrapper">
        <h3>Conditions</h3>
        
<!--<Conditions v-for="condition in conditions" v-bind:conditions="conditions.conditions"
                v-bind:conditionTypes="conditionTypes"> </Conditions>  -->
          <div
            class="page_item"
            v-for="condition in conditions"
          >
            <v-col cols="12" md="12">
              <v-select
              :items="conditionTypes"
              v-model="condition.type"
              label="Conditional select"
              ></v-select>
            </v-col>
          
          <div
              v-if="
              condition.type === 'and' || condition.type === 'or'
              "
          >
              <v-btn
                class="add_story"
                dark
                color="indigo"
                @click="handleAddConditional(condition.conditions)"
              >

                <v-icon dark> mdi-plus </v-icon>

              </v-btn>

              <Conditions 
              
                v-bind:conditions="condition.conditions"
                v-bind:conditionTypes="conditionTypes"
              />

          </div>

          <div v-else-if="choice.showIf.type === 'none'">
                  
          </div>

          <div v-else>
              
              <v-text-field
              v-model="condition.variableName"
              label="Variable name"
              required
              ></v-text-field>
              <v-text-field
              v-model="condition.value"
              label="Value"
              required
              ></v-text-field>

              <!--<Conditions 
                v-for="condition in condition.conditions"  
                v-bind:conditions="condition.conditions"
                v-bind:conditionTypes="conditionTypes"
              />-->
          </div>
          
        
          
          
          </div>
        
    </div>
</template>

<script>
import Conditions from './Conditions.vue'

export default {
  name: "Conditions",
  props: {

    conditions: Array,
    conditionTypes: Array
  },
   components: {
    Conditions
  },

  data: () => ({
    
  }),

  watch: {
    group() {

    },
  },
  mounted() {
    //console.log(choice)
  },

  methods: {
    handleAddConditional(conditions) {
      console.log(conditions)
      const newConditions = {
        id: Date.now(),
        type: "none",
        conditions: [],
        variableName: "",
        value: "",
      };
      // conditions["conditions"] = [];
       conditions.push(newConditions);

    },
  },
};
</script>

<style lang=""></style>
