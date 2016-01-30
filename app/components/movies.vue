<template>
  <div class="ui three stackable cards">
    <div class="ui fluid card movie" v-for="movie in movies">
      <div class="ui slide masked reveal image">
        <!--
        <img v-bind:src="movie.poster" class="visible content">
        <img v-bind:src="movie.screencast" class="hidden content">
        -->
        <div style="background-image:url({{movie.poster}})" class="bg-image visible content" ></div>
        <div style="background-image:url({{movie.screencast}})" class="bg-image hidden content"></div>
      </div>
      <div class="content">
        <a class="header" v-bind:href="movie.link" target="__blank">{{movie.title}}</a>
        <div class="meta">
          <div class="ui fluid action input">
            <input type="text" disabled="disabled" value="{{path}}" v-for="path in movie.paths">
            <button class="ui teal icon button">
              <i class="copy icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="extra content">
        <a class="ui red tag label">{{movie.tag}}</a>
        <a class="ui teal tag label">{{movie.type}}</a>
        <a class="ui tag label">{{movie.year}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  http: {
    root: '/data'
  },
  ready () {
    this.$http.get('latest.json', function (data, status, request) {
      this.$set('movies', data)
    }).error(function (data, status, request) {
        // handle error
    })
  },
  data () {
    return {
      movies: []
    }
  }
}
</script>


<style lang="stylus">
.movie {
  .bg-image {
    height: 400px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .extra {
    height: 80px;

    .tag {
      margin-bottom: 10px;
    }
  }
}
</style>
