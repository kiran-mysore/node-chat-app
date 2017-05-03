/*class Person{
    constructor(name,age){
        this.name = name
        this.age = age
    }

    getUserDescription(){
        return `${this.name} is ${this.age} year(s) old. `
    }
}

let me = new Person('Kiran',40)
let description = me.getUserDescription()
console.log(description)*/


class Users{
    constructor(){
        this.usersArray = []
    }
    
    addUser(id,name,room){
        let user = {id,name,room}
        this.usersArray.push(user)
        return user
    }

    removeUser(id){
        // remove the user removed
        let user =  this.getUser(id)
        if(user){
            this.usersArray = this.usersArray.filter((user) => user.id!==id)
        }

        return user
       
    }
    getUser(userId){
        
         return this.usersArray.filter((user) => user.id === userId)[0]
    }

    getUserList(room){
        let users = this.usersArray.filter((user)=>user.room===room)
        let nameArray = users.map((user)=> user.name)
        return nameArray
    }

}

module.exports = {
    Users
}