const expect = require('expect')
const {Users} = require('./users.js')


describe('Users testcase',()=>{
     
    // Call the beforeEach to create seed Data for the tests
    let seedUsers;
    beforeEach(() => {
        seedUsers = new Users()
        seedUsers.usersArray = [{
                id:'1',
                name:'Kiran',
                room:'Node.js'
            },
            {
                id:'2',
                name:'Hari',
                room:'Go-lang'
            },
            {
                id:'3',
                name:'Madhu',
                room:'Node.js'
            }
        ];
    })


    it('Should add new user', ()=>{
        let users = new Users();
        let user = {
            id:'123',
            name:'Kiran',
            room:'Node.js Room'
        }

        let userResponse = users.addUser(user.id,user.name,user.room)
        expect(users.usersArray).toEqual([user])

    })

    it('should remove a user from the room', ()=>{
        const userId = '1'
        let user = seedUsers.removeUser(userId)
        expect(user.id).toBe(userId)
        console.log(seedUsers.usersArray.length)
        expect(seedUsers.usersArray.length).toBe(2)

    })

    it('should not remove a user from the room', ()=>{
        const userId = '99'
        let user = seedUsers.removeUser(userId)
        expect(user).toNotExist()
       
        expect(seedUsers.usersArray.length).toBe(3)
    })

    it('should find a user', ()=>{
        const userId = '1'
        let user  = seedUsers.getUser(userId)
        expect(user.id).toBe(userId)
    })

    it('should not find the user', ()=>{
        const userId = '99'
        let user  = seedUsers.getUser(userId)
        expect(user).toNotExist()
    })

    it('should return names from the room Node.js', () =>{
        let usersList = seedUsers.getUserList('Node.js')
        expect(usersList).toEqual(['Kiran','Madhu'])

    });
    it('should return names from the room Go-lang', () =>{
        
        let usersList = seedUsers.getUserList('Go-lang')
        expect(usersList).toEqual(['Hari'])
        
    });
})