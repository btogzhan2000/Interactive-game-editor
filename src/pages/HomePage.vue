<template>
  <div class="wrapper">
    <div v-if="game" class="left_column">
      <h2>Game: {{ game.name }}</h2>
      <v-btn class="add_story" dark color="indigo" @click="handleAddNewStory">
        Add new story
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>

      <div class="story_wrapper">
        <div class="story_item" v-for="story in game.stories" :key="story.id">
          <div class="story_item_header">
            <h3 class="story_heading">Story: {{ story.name }}</h3>
            <v-btn
              @click="handleChangeSelected(story.id)"
              class="add_story"
              :dark="story.id === selectedStoryId ? true : false"
              :color="story.id === selectedStoryId ? 'indigo' : 'white'"
            >
              <v-icon dark> mdi-ray-start-arrow </v-icon>
            </v-btn>
          </div>

          <div
            class="page_left"
            v-if="story.pages.length && story.id === selectedStoryId"
          >
            <div
              class="page_left_list"
              v-for="page in story.pages"
              :key="page.id"
            >
              <h3 class="story_heading">{{ page.name || "No name" }}</h3>

              <v-btn
                class="add_story_buttons"
                small
                :dark="page.id === selectedPageId ? true : false"
                :color="page.id === selectedPageId ? 'indigo' : 'white'"
                @click="handleClickPage(page.id)"
              >
                <v-icon x-small dark> mdi-ray-start-arrow </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedStoryItem && !selectedPageId" class="right_column">
      <div class="right_heading">
        <h1>Story: {{ selectedStoryItem.name }}</h1>

        <v-btn class="add_story" dark color="red" @click="removeStory">
          Remove store {{ selectedStoryItem.name + " " }}
          <v-icon dark> mdi-trash-can-outline </v-icon>
        </v-btn>
      </div>

      <div class="right_main_container">
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="selectedStoryItem.name"
              label="Story name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="selectedStoryItem.author"
              label="Story author"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-textarea
              outlined
              label="Story description"
              v-model="selectedStoryItem.description"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-btn
          class="add_story"
          dark
          color="indigo"
          @click="handleNewPage(selectedStoryItem)"
        >
          Add new page
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>

        <div class="pages_list">
          <div
            class="page_item"
            v-for="page in selectedStoryItem.pages"
            :key="page.id"
          >
            <div class="page_header_item">
              <h3 class="story_heading">Page: {{ page.name }}</h3>

              <v-btn
                class="add_story"
                dark
                color="red"
                @click="removePage(page.id)"
              >
                Remove page
                <v-icon dark> mdi-trash-can-outline </v-icon>
              </v-btn>
            </div>

            <div class="page_main_content">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="page.name"
                    label="Page name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="page.text"
                    label="Page text"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedPageId && selectedPageItem" class="right_column">
      <div class="right_heading">
        <h1>Page: {{ selectedPageItem.name }}</h1>

        <v-btn
          class="add_story"
          dark
          color="red"
          @click="removePageFromPage(selectedPageId)"
        >
          Remove page {{ selectedPageItem.name + " " }}
          <v-icon dark> mdi-trash-can-outline </v-icon>
        </v-btn>
      </div>

      <div class="right_main_container">
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="selectedPageItem.name"
              label="Page name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="selectedPageItem.text"
              label="Page text"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          class="add_story"
          dark
          color="indigo"
          @click="handleCreateNewChoice"
        >
          Add new choice
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>

        <div class="pages_list">
          <div
            class="page_item"
            v-for="choice in selectedPageItem.choices"
            :key="choice.id"
          >
            <div class="page_header_item">
              <h3 class="story_heading">Choice: {{ choice.text }}</h3>

              <v-btn
                class="add_story"
                dark
                color="red"
                @click="removeChoice(choice.id)"
              >
                Remove choice
                <v-icon dark> mdi-trash-can-outline </v-icon>
              </v-btn>
            </div>

            <div class="page_main_content">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="choice.text"
                    label="Page name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn
                class="add_story"
                dark
                color="indigo"
                @click="handleCreateAction(choice.id)"
              >
                Add new action
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>

              <div class="action_wrapper">
                <h3>Actions</h3>

                <div
                  class="action_wrapper_item"
                  v-for="action in choice.actions"
                  :key="action.id"
                >
                  <v-col cols="12" md="12">
                    <v-select
                      :items="items"
                      v-model="action.type"
                      label="Action select"
                    ></v-select>
                  </v-col>

                  <div v-if="action.type">
                    <v-col v-if="action.type === 'click'" cols="12" md="12">
                      <v-text-field
                        v-model="action.variable"
                        label="Action variable"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col v-else cols="12" md="12">
                      <v-select
                        :items="
                          selectedStoryItem.pages.map((item) => item.name)
                        "
                        v-model="action.variable"
                        label="Action variable"
                      ></v-select>
                    </v-col>
                  </div>

                  <v-btn
                    class="add_story"
                    dark
                    color="red"
                    @click="removeAction(choice.id, action.id)"
                  >
                    Remove Action
                    <v-icon dark> mdi-trash-can-outline </v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedStoryItem: function () {
      return this.game?.stories?.find(
        (story) => story.id === this.selectedStoryId
      );
    },

    selectedPageItem: function () {
      return this.selectedStoryItem.pages.find(
        (page) => page.id === this.selectedPageId
      );
    },
  },

  mounted() {
    // @TODO Get from backend data here
    const resLocal = JSON.parse(localStorage.getItem("game"));

    if (resLocal) {
      this.game = resLocal;
    } else {
      const game = {
        id: Date.now(),
        name: "Game 1",
        stories: [],
      };
      this.game = game;
    }
  },

  watch: {
    game: {
      handler(val) {
        localStorage.setItem("game", JSON.stringify(val));
      },
      deep: true,
    },
  },

  data() {
    return {
      game: null,
      selectedStoryId: null,
      selectedPageId: null,
      items: ["click", "goToPage"],
    };
  },

  methods: {
    handleAddNewStory() {
      const newStory = {
        id: Date.now(),
        name: " " + Math.random(),
        author: "Demo author",
        description: "Demo description",
        pages: [],
      };

      this.game.stories.push(newStory);
      this.selectedStoryId = newStory.id;
      this.selectedPageId = null;
    },

    handleChangeSelected(id) {
      this.selectedPageId = null;
      this.selectedStoryId = id;
    },

    handleNewPage(story) {
      const newPage = {
        id: Date.now(),
        name: " " + Math.random(),
        text: "Page description",
        choices: [],
      };

      story.pages.push(newPage);
    },

    removeStory() {
      this.game = {
        ...this.game,
        stories: this.game.stories.filter(
          (story) => story.id !== this.selectedStoryItem.id
        ),
      };
      this.selectedStoryId = null;
      this.selectedPageId = null;
    },

    removeChoice(choiceId) {
      this.selectedPageItem.choices = this.selectedPageItem.choices.filter(
        (item) => item.id !== choiceId
      );
    },

    removePageFromPage(pageId) {
      this.selectedStoryItem.pages = this.selectedStoryItem.pages.filter(
        (item) => item.id !== pageId
      );

      this.selectedStoryId = null;
      this.selectedPageId = null;
    },

    removePage(pageId) {
      this.game = {
        ...this.game,
        stories: this.game.stories.map((story) => {
          if (story.id === this.selectedStoryItem.id) {
            story = {
              ...story,
              pages: story.pages.filter((page) => page.id !== pageId),
            };
          }
          return story;
        }),
      };
    },

    removeAction(choiceId, actionId) {
      this.selectedPageItem.choices = this.selectedPageItem.choices.map(
        (item) => {
          if (item.id === choiceId) {
            item = {
              ...item,
              actions: item.actions.filter(
                (item_action) => item_action.id !== actionId
              ),
            };
          }
          return item;
        }
      );
    },

    handleClickPage(pageId) {
      this.selectedPageId = pageId;
    },

    handleCreateNewChoice() {
      const newChoice = {
        id: Date.now(),
        text: "New choice",
        actions: [],
      };

      this.selectedPageItem.choices = [
        ...this.selectedPageItem.choices,
        newChoice,
      ];
    },

    handleCreateAction(choiceId) {
      const newAction = {
        id: Date.now(),
        type: "",
        variable: "",
      };

      this.selectedPageItem.choices = this.selectedPageItem.choices.map(
        (item) => {
          if (item.id === choiceId) {
            item = {
              ...item,
              actions: [...item.actions, newAction],
            };
          }
          return item;
        }
      );
    },
  },
};
</script>

<style scoped>
.page_left_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
}

.page_left_list h3 {
  font-size: 15px;
}

.page_left {
  margin-top: 10px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.left_column {
  flex-shrink: 1;
  padding: 30px 20px 30px 20px;
  box-shadow: 1px 1px 10px #e9e9e9;
  height: 100%;
  overflow: hidden;
  width: 300px;
  max-width: 100%;
}

.add_story_buttons {
  margin-top: 10px;
}

.right_column {
  flex-grow: 1;
  box-sizing: border-box;
  padding: 20px;
  width: 1500px;
  max-width: 100%;
}

.add_story {
  margin-top: 10px;
}

.story_wrapper {
  margin-top: 20px;
}

.story_item {
  margin-top: 20px;
  box-sizing: border-box;
  box-shadow: 1px 2px 9px #e9e9e9;
  padding: 12px;
  border-radius: 7px;
}

.story_item_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.story_heading {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 10px;
  display: block;
  margin-top: 10px;
}

.right_heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right_main_container {
  margin-top: 20px;
}

.pages_list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 60px;
}

.page_item {
  width: 500px;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  box-shadow: 1px 1px 15px #e9e9e9;
  padding: 20px;
  border-radius: 10px;
}

.page_header_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page_main_content {
  margin-top: 20px;
}

.action_wrapper {
  margin-top: 20px;
}

.action_wrapper_item {
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 10px;
  padding: 10px;
}
</style>
