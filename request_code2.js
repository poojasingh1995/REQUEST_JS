const axios = require('axios');
const fs=require('fs')
const redline=require("readline-sync")

const saral_API=axios.get('https://api.merakilearn.org/courses ')
    .then(  Response=>{
        let data=(Response.data)
        let json_file=JSON.stringify(data,null,5)
        fs.writeFileSync("Merakileran_Data.json",json_file)

        saral_data=data
        arry=[]
        var serial=0
        for(i of saral_data){
            console.log(serial+1+(" -"),i.name,(" :"),i.id)
            serial++
            arry.push(i.name,i.id)
        }
        console.log()

        course=redline.questionInt("Which course do you want:-")-1
        console.log("Your corse:-",saral_data[course].name)
        let ID=saral_data[course].id

        const course_data = axios.get("https://api.merakilearn.org/courses/"+ID+"/exercises")
        .then(Response=>{
            let DATA=Response.data
            let myJson=JSON.stringify(DATA,null,5)
            fs.writeFileSync("Question_Data.json",myJson)
            course_ques=DATA.course.exercises
            serial_1=1
            for(k=0;k<course_ques.length;k++){
                console.log(serial_1+".",course_ques[k].name)
                serial_1++   
            }
            console.log()

            let content_user=redline.question('Which Qestion Do You Wnat:-')-1
            console.log("-"+course_ques[content_user].content)  
            const saralQuestion=course_ques[content_user].content[0].value
            console.log("-"+saralQuestion)
        })
        .catch((error)=>{
            console.log(error)
        })  
})
.catch((error)=>{
    console.log(error)
})