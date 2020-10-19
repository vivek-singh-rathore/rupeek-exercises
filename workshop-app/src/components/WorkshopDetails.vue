<template>
    <div>
        <div class="row" v-if="status === 'LOADING'">
            <div class="col-12">
                <!-- b4-alert-dismissible -->
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>Loading workshop...</strong>
                </div>
            </div>
        </div>
            
        <div class="row" v-if="status === 'ERROR_LOADING'">
            <div class="col-12">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>{{this.error.message}}</strong>
                </div>
            </div>
        </div>

        <div class="row" v-if="status === 'LOADED'">
            <div class="col-12 clearfix">
                <div class="row">
                    <div class = "col-12">
                        <h2 class>
                            {{workshop.name}}
                        </h2>
                        <hr />
                    </div>
                    
                    
                    <div class="row my-4">
                        <div class="col-4">
                            <img class="img-fluid" :src="workshop.imageUrl" alt="workshop.name" />
                        </div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col-3">
                                    <p>
                                        <small>
                                            {{workshop.startDate}} - {{workshop.endDate}}
                                        </small>
                                    </p>
                                    <p>
                                        <small class="text-muted">
                                            {{workshop.time}}
                                        </small>
                                    </p>
                                </div>
                                <div class="col-3">
                                    <p> 
                                        <i :class="`fa ${workshop.modes.online ? 'fa-check' : 'fa-times'}`"></i>
                                        &nbsp;
                                        <small>Online</small>
                                    </p>
                                    <p>
                                        <i :class="`fa ${workshop.modes.inPerson ? 'fa-check' : 'fa-times'}`"></i>
                                        &nbsp;
                                        <small>In person</small>
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12" v-html="workshop.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="row my-4">
                            

                            <div class="col-12">
                                <h3>
                                    Sessions in this workshop
                                </h3>
                                <hr />
                            </div>

                            <div class="col-12">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="session in sessions" :key="session.id">
                                        <div class="row">
                                            <div class="col-1">
                                                
                                                    
                                                <Voter :upvoteCount="session.upvoteCount" @upvote="num=>applyUpVote(session,num)" @downvote="num=>applyDownVote(session,num)" />
                                                
                                            </div>
                                            <div class="col-11">
                                                <div class="lead">{{session.name}}</div>
                                                <div class="h6">by {{session.speaker}}</div>
                                                <div><span  :class= "`${getClass(session.level)}`">{{session.level}}</span></div>
                                                <div class="my-2"> {{session.duration}} hours </div>
                                                <p > {{session.abstract}}</p>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        

                    </div>
                    
                </div>    
            </div>
        </div>
    </div>
</template>

<script>
import { fetchWorkshopById } from '../services/workshops';
import {upvote, downvote} from '../services/voting';
import Voter from './Voter'
import Vue from 'vue';
const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';
export default {
    name: 'WorkshopDetails',
    components : {
        Voter
    },
    data() {
        return {
            status: LOADING
        };
    },
    methods: {
        applyUpVote(session){
            upvote(session.id)
            .then( newSession =>{
                session.upvoteCount = newSession.upvoteCount;
                Vue.$toast.open(`Vote for ${session.name} was registered`, 3000);
            })
            .catch( error =>{
                console.log(error.message);
            });
        },
        applyDownVote(session){
            downvote(session.id)
            .then( newSession =>{
                session.upvoteCount = newSession.upvoteCount;
                Vue.$toast.open(`Vote for ${session.name} was registered`, 3000);
            })
            .catch( error =>{
                console.log(error.message);
            });
        },
        getClass(level){
            switch(level){
                case "Basic":
                    return "badge badge-success";
                    
                case "Intermediate":
                    return "badge badge-info";
                    
                default :
                    return "badge badge-warning";
            }
        }
    },
    mounted() {
        fetchWorkshopById( this.$route.params.id )
            .then( workshop => {
                this.status = LOADED;
                this.workshop = workshop;
                this.sessions = workshop.sessions;
            })
            .catch( error => {
                this.status = ERROR_LOADING
                this.error = error;
            });
    }
}
</script>