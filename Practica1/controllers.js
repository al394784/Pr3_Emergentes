const { graphql, buildSchema } = require('graphql')

const model = require('./model') //Database

let DB
model.getDB().then(db => {DB=db})


//const sse  = require('../../Practica1/Practica1/utils/notifications') //Notifications
//sse.start()


const fs = require('fs')
let gql = fs.readFileSync('esquema.gql').toString()
const schema = buildSchema(gql)

const rootValue = {
     clientes: () => DB.objects('Cliente'),
     especialistas: () => DB.objects('Especialista'),
     postCli: () => DB.objects('PostCli'),
     postEsp: () => DB.objects('PostEsp'),
     informes: () => DB.objects('Informe'),
     
     
     showEspByDni: ({dni}) => {
      return DB.objects('Especialista').filter(x => x.DNI.toLowerCase().includes(dni))
     },
     showCliByDni: ({dni}) => {
      return DB.objects('Cliente').filter(x => x.DNI.toLowerCase().includes(dni))
     },
     showCliByEmail: ({email}) => {
      return DB.objects('Cliente').filter(x => x.email.toLowerCase().includes(email))
     },
     showEspByEmail: ({email}) => {
      return DB.objects('Especialista').filter(x => x.email.toLowerCase().includes(email))
     },
    
     showClientes: ({}) => {
      return DB.objects('Cliente')
     },
     showInformes: ({}) => {
      return DB.objects('Informe')
     },
     showInformesByDate: ({ q }) => {
      q = q.toLowerCase()
      return DB.objects('Informe').filter(x => x.fecha.toLowerCase().includes(q))
     },
     getPostCliente: ({ dni}) => {
      dni = dni.toLowerCase()
      const cli = showCliByDni(dni)
      return DB.objects('PostCli').filter(x => x.author_email.includes(cli))
     },
     getPostEsp: ({ dni }) => {
      dni = dni.toLowerCase()
      const esp = showEspByDni(dni)
      return DB.objects('PostEsp').filter(x => x.author_email.includes(esp))
     },

     especialidad:({especialidad}) => {
      return DB.objects('Especialista').filter(x => x.especialidad.includes(especialidad))

     },

     addCliente: ({name, passwd, DNI, email, psicologo, nutricionista})  => {
      DB.write(() => {
        
        let Cliente = DB.create('Cliente', {name:name, passwd:passwd, DNI:DNI, 
        email:email, psicologo_dni:psicologo, nutricionista_dni:nutricionista})
      })
      return "hecho"
     },

     addEspecialista: ({name, passwd, DNI, email, especialidad})  => {
      DB.write(() => {
        
        let Esp = DB.create('Especialista', {name:name, passwd:passwd, DNI:DNI, 
        email:email, especialidad:especialidad})
      })
       return "hecho"
     },

     postCli:({author_email}) => {
      author_email = author_email.toLowerCase()
      return DB.objects('PostCli').filter(x => x.author_email.includes(author_email))

     },
     postEsp:({author_email}) => {
      author_email = author_email.toLowerCase()
      return DB.objects('PostEsp').filter(x => x.author_email.includes(author_email))

     },

     addPostCli:({title,content,author_email,receiver_email}) => {
      let postCli = null
     
          let data = {
                id_post:  Math.floor(Math.random()*1000001),
                title: title,
                content: content,
                author_email: author_email,
                receiver_email: receiver_email            

                     }
          DB.write( ()  => {postCli = DB.create('PostCli', data)})
      
          return "hecho"
     },

    addPostEsp:({title,content,author_email,receiver_email}) => {
      let postEsp = null
     
     
          let data = {
                id_post: Math.floor(Math.random()*1000001),
                title: title,
                content: content,
                author_email: author_email,
                receiver_email: receiver_email           

                     }
          DB.write( ()  => {postEsp = DB.create('PostEsp', data)})
    

 

     },
     addInforme: ({fecha,especialista_email,paciente_email,content,title}) => {

       let Informe = null
     
       
     
          let data = {
                       id_informe: Math.floor(Math.random()*1000001), 
                       fecha: new Date(),
                       especialista_email:especialista_email,
                       paciente_email: paciente_email,
                       content: content,
                       title:title,

                      }

          DB.write( () => { Informe = DB.create('Informe', data) }) 

          // SSE notification
         // sse.emitter.emit('new-post', data)
       

     }
}

exports.root   = rootValue
exports.schema = schema
//exports.sse    = sse
