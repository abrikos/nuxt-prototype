<template>
  <div>
    <TopMenu/>
    <b-container class="page-content">
      <Alert/>
      <nuxt/>
    </b-container>
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu';
import Alert from '@/components/Alert';

export default {
  components: {Alert, TopMenu},
}
</script>

<style lang="sass">
body
  background-color: #47494E

  .page-content
    background-color: aliceblue
    min-height: 100vh
    padding-top: 10px

  h1
    text-align: center

  .post-words-list
    display: flex
    flex-wrap: wrap

    div
      border: 1px solid silver
      padding: 2px 5px
      margin: 2px
      border-radius: 2px
      cursor: pointer

  table
    thead
      th.post-image
        width: 200px

      th.post-header
        width: 700px

      th
        .sr-only
          display: none
</style>
