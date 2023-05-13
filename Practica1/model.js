const Realm = require('realm');
const app = new Realm.App({ id: "edmaapp-zfjad" });
console.log(app.currentUser);
let ClienteSchema = {
  name: 'Cliente',
  primaryKey: '_id',
  properties: {
     _id: 'objectId',
     _partition: 'string',
     name: 'string',
     passwd: 'string',
     DNI: 'string',
     email: 'string',
     psicologo: 'string',
     nutricionista: 'string' 
  }
}

let EspecialistaSchema = {
  name: 'Especialista',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
     _partition: 'string',
     name: 'string',
     passwd: 'string',
     DNI: 'string',
     email: 'string',
     especialidad: 'string'
  }
}

let PostCliSchema = {
  name: 'PostCli',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
     _partition: 'string',
    id_post: 'int',
    title: 'string', 
    content: 'string',
    author_email: 'string',
    receiver_email: 'string'
  }
}

let PostEspSchema = {
  name: 'PostEsp',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    id_post: 'int',
    title: 'string', 
    content: 'string',
    author_email: 'string',
    receiver_email: 'string'
  }
}

let InformeSchema = {
  name: 'Informe',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    id_informe: 'int',
    fecha: 'date',
    especialista: 'string',
    paciente: 'string',
    title: 'string', 
    content: 'string'
  }
}

// // // MODULE EXPORTS


 const ObjectID = require('bson-objectid');
 const myPartitionKey = "EDMA_partition"
 let sync = { user: app.currentUser, partitionValue: myPartitionKey}
 let config = {path: './data/blogs.realm', sync: sync,
 schema: [ClienteSchema,EspecialistaSchema,PostCliSchema,PostEspSchema,InformeSchema]}
 exports.getDB = async () => {
 await app.logIn(new Realm.Credentials.anonymous())
return await Realm.open(config)
 }
 exports.partitionKey = myPartitionKey
 exports.app = app


//let config = {path: './data/blogs.realm', schema: [ClienteSchema, EspecialistaSchema, PostCliSchema, PostEspSchema, InformeSchema]}

//exports.getDB = async () => await Realm.open(config)

// // // // // 

if (process.argv[1] == __filename){ //TESTING PART

  if (process.argv.includes("--create")){ //crear la BD

      Realm.deleteFile({path: './data/blogs.realm'}) //borramos base de datos si existe
     
      let DB = new Realm({
        path: './data/blogs.realm',
        sync: sync,
        schema: [ClienteSchema, EspecialistaSchema, PostCliSchema, PostEspSchema, InformeSchema]
      })
     
      DB.write(() => {
        let esp = DB.create('Especialista', {_id: ObjectID(),_partition: myPartitionKey,name:'Psi1', passwd:'123',DNI:'12345678A',email: 'esp@gmail.com', especialidad:'Psicologo'})
        let psi2 = DB.create('Especialista', {_id: ObjectID(),_partition: myPartitionKey,name:'Psi2', passwd:'1223',DNI:'12345674A',email: 'psi2@gmail.com', especialidad:'Psicologo'})
        let esp2 = DB.create('Especialista', {_id: ObjectID(),_partition: myPartitionKey,name:'Nut1', passwd:'123',DNI:'12345673A',email: 'esp2@gmail.com', especialidad:'Nutricionista'})
        let cli = DB.create('Cliente', {_id: ObjectID(),_partition: myPartitionKey,name:'Cli1', passwd:'123',DNI:'12345278A',email: 'prueva@gmail.com', psicologo_dni: '12345678A' , nutricionista_dni: '12345673A'})
        
        let postcli = DB.create('PostCli', {_id: ObjectID(),_partition: myPartitionKey,id_post: 0.856 ,title:'prueva',content:'asdfasdf',author_email:'prueva@gmail.com',receiver_email:'esp@gmail.com'})
      
      })
      DB.close()

  }
  else { //consultar la BD

      Realm.open({ path: './data/blogs.realm' , schema: [ClienteSchema, EspecialistaSchema, PostCliSchema, PostEspSchema, InformeSchema] }).then(DB => {
        let clientes = DB.objects('Cliente')
        clientes.forEach(x => console.log(x.name))
       // let blog = DB.objectForPrimaryKey('Blog', 'Todo Motos')
        //if (blog)
         //  console.log(blog.title, 'by', blog.creator.name)
        DB.close()
      })
  }
  
}
