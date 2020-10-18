<template>
    <div class="d-flex flex-column align-items-center">
        <i class="fa fa-caret-up" v-on:click="()=>this.$emit('upvote')"></i>
            <span> {{upvoteCount}} </span>                               
        <i class="fa fa-caret-down " v-on:click="()=>this.$emit('downvote')"></i>
        
    </div>
</template>



<script>
export default {
    name: 'Voter',
    props : ['upvoteCount']
    
}
</script>


<style scoped>

    .fa{
        
        color : grey;
        cursor: pointer;
        font-size : 30px;
    }
    .fa:hover{
        color : black;
    }

</style>