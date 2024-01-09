import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import firebase from 'firebase'
import { Core } from './core'
import axios from '@/plugins/axios'


class AuthClass extends VuexModule {
    private token: any = localStorage.getItem('token')

    private config: object = {
        apiKey: "AIzaSyC04k2TIJBXUa0yJQ0N2XimbuiVubkgG6g",
        authDomain: "learn-84c01.firebaseapp.com",
        databaseURL: "https://learn-84c01.firebaseio.com",
        projectId: "learn-84c01",
        storageBucket: "learn-84c01.appspot.com",
        messagingSenderId: "18400144378",
        appId: "1:18400144378:web:90ab8a2f1a9a64edbd5243",
    };

    private msTanent: string = `d7cbbb08-47a3-4bd7-8347-5018f2744cfb`

    public async run() {
        await firebase.initializeApp(this.config);
    }

    public async checkUser(user: string) {

        let data = await Core.postHttp(`/api/ita/v2/check/`, { "username": user })

        return data;
    }

    public async loginMicrosoft365() {
        var provider = new firebase.auth.OAuthProvider('microsoft.com');
        provider.setCustomParameters({ tenant: this.msTanent, prompt: "consent", });
        // provider.addScope('User.Read'); 
        // provider.addScope('profile');
        provider.addScope('User.Read');
        provider.addScope('profile')
        var iOS = ['iPad', 'iPhone', 'iPod', 'MacIntel'].indexOf(navigator.platform) >= 0;
        console.log(navigator.platform, iOS);
        if(!iOS){
            firebase.auth().signInWithRedirect(provider);
            return true;
        }else{ 
            return await this.loginPopUp(provider);
        }
        // provider.addScope(["openid","profile","offline_access","User.Read.All",'Directory.AccessAsUser.All','AdministrativeUnit.ReadWrite.All']); 
       
    }
    private async loginPopUp(provider:any){
        let user = await firebase.auth()
        .signInWithPopup(provider)
        .then((result:any) => {
            if (result.credential) {
                return {
                    "type": result.credential.signInMethod,
                    "credential": result.credential,
                    "user": result.additionalUserInfo.profile
                }
            } else {
                return false
            }
        }).catch(async (error: any) => {
            console.log('error',error);
            if (error.code == 'auth/account-exists-with-different-credential') {
                alert(`อีเมล์นี้ได้ลงทะเบียนกับ โซลเชียลล็อกอินแบบอื่นแล้ว กรุณาลองใช้ แอคเคาท์อื่น (code : ${error.message})`);
            } else {
                alert(error.message);
            }
            
            return false;
        }); 
        console.log(user);
        return user;
    }

    public async genForm(type: string, user: any) {
        console.log(user);
        if (type == 'microsoft.com') {

            return {
                "username": user.mail + "@__@" + type,
                "email": user.mail,
                "password": "2020" + user.id + "UP",
                "password2": "2020" + user.id + "UP",
                "first_name": user.givenName,
                "last_name": user.surname
            }
        } else if (type == 'facebook.com') {
            //let email = (user.email) ? user.email : `${user.email}@facebook.com`
            return {
                "username": user.email + "@__@" + type,
                "email": user.email,
                "password": "2020" + user.email + "UP",
                "password2": "2020" + user.email + "UP",
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        } else if (type == 'google.com') {
            return {
                "username": user.email + "@__@" + type,
                "email": user.email,
                "password": "2020" + user.id + "UP",
                "password2": "2020" + user.id + "UP",
                "first_name": user.given_name,
                "last_name": user.family_name
            }
        } else {
            return user
        }

    }

    public async loginGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider(); 
        var iOS = ['iPad', 'iPhone', 'iPod', 'MacIntel'].indexOf(navigator.platform) >= 0;
        console.log(navigator.platform, iOS);
        if(!iOS){
            firebase.auth().signInWithRedirect(provider);
            return true;
        }else{ 
            return await this.loginPopUp(provider);
        }
    }

    public async loginFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        provider.addScope('public_profile');

        firebase.auth().signInWithRedirect(provider);
    }

    public async callback() {
 
        let user = await firebase.auth().getRedirectResult()
            .then( (result: any) => {
                //   console.log(result.credential);
                // return result.additionalUserInfo.profile;
                console.log('xxx',result);
                if (result.credential) {
                    return {
                        "type": result.credential.signInMethod,
                        "credential": result.credential,
                        "user": result.additionalUserInfo.profile
                    }
                } else {
                    return false
                }

            })
            .catch(async (error: any) => {
                console.log('error',error);
                if (error.code == 'auth/account-exists-with-different-credential') {
                    alert(`อีเมล์นี้ได้ลงทะเบียนกับ โซลเชียลล็อกอินแบบอื่นแล้ว กรุณาลองใช้ แอคเคาท์อื่น (code : ${error.message})`);
                } else {
                    alert(error.message);
                }
                
                return false;
            });
        console.log(user);
        return user;
    }

    public async reToken() {
        axios.defaults.headers.common['Authorization'] = '';
    }
    public async storeToken(token: any) {
        axios.defaults.headers.common['Authorization'] = (token != null) ? `Token ${token}` : '';
    }

    public async storeTokenToStorage(token: any) {
        localStorage.setItem('token', token)
    }

    public async checkToken() {
        if (this.token != null) {
            await this.storeToken(this.token);
        }
    }
    public async logout() {
        localStorage.clear();
        await this.firebaseSignOut();
        return await Core.postHttp('/rest-auth/logout/', {})
    }

    public async firebaseSignOut() {
        await this.run();
        let signout = await firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error);
        });

    }



}

import { AuthenticationResult } from "@azure/msal-common";
import router from "@/router";
import { AxiosRequestConfig } from "axios";
import store from "@/store"

export const Auth = new AuthClass({ store, name: "Auth" })
