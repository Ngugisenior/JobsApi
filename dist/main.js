const App = () =>{
     const url= "https://remoteok.io/api?";


    const f = [
        {
            name: 'img',
            class: 'company_logo'
        },        
        {
            name: 'h1',
            class: 'company',
        },
        {
            name: 'p',
            class: 'position'
        },
        {
            name: 'p',
            class: 'location'
        },

        {
            name: 'a',
            class: 'url'
        },
        {
            name: 'BUTTON',
            class: 'tags'
        }
    ]; 
    
    //listJobs();

    function listJobs(){

        (async function getJobs(){
            const d = await fetch(url)
                .then(response => response.json())
                .then(jobs => {
                dataView(jobs);
            });   
                        
        })();
    }


    //fetch Jobs by tags
    function getFetchJobs(x){

         (async function fetchJobsByTags(){
            const response = await fetch(x)
            const data = await response.json();

            dataView(data);
            
        })();
    }

    //view jobs
    function dataView(jobs){
        var m = document.getElementsByClassName('container')[0];
        m.innerHTML = ''

  
        for(let i = 1; i < jobs.length; i++){
                            
            if(jobs[i].company === "" && jobs[i].company_logo === "" || jobs[i].url === ""){
                i+=1;
            }

            else{
                var y = document.createElement('div');
                y.setAttribute('class','jobs');
                const rf = document.createElement('div');
                rf.setAttribute('class','job_desc')

                createElements(jobs[i], y, rf);

                y.appendChild(rf);
                m.appendChild(y)

            }                                
        }
    }

    // create html elements
    function createElements(job, y, rf){

        for(let j = 0; j < f.length; j++){

            if(f[j].class == 'company_logo'){
                var dv = document.createElement('div');
                dv.setAttribute('class','jobs_img');
                dv.setAttribute('loading','lazy');
                var x = document.createElement(f[j].name);
                x.setAttribute('class',f[j].class);
                x.setAttribute('src', job[f[j].class]);

                //click event
                x.addEventListener('click',function(event){
                    event.preventDefault();
                    dataViewByCompany(job.company);
                });

                dv.appendChild(x);

                y.appendChild(dv);
            }
            else if(f[j].class == 'url'){
                
                var x = document.createElement(f[j].name);
                var btn = document.createElement('BUTTON');
                var t = document.createTextNode("Apply");

                btn.setAttribute('class', 'apply');
                
               
                x.setAttribute('class',f[j].class);
                x.setAttribute('href', job[f[j].class]);
                x.setAttribute('target', '_blank'); 

                btn.appendChild(t);
                x.appendChild(btn);
                rf.appendChild(x);
            }
            else if(f[j].class == 'tags'){

                var l = document.createElement('ul')
                l.setAttribute('class', 'tags_list');

                for(let k in job[f[j].class]){
                    var x = document.createElement(f[j].name);
                    x.setAttribute('class',f[j].class);
                    
                    x.addEventListener('click', function(event){
                        event.preventDefault();
                        var url_2 = url + "tags="+(job[f[j].class][k]).replace(/\s/g,'%20')
                        getFetchJobs(url_2);
                    });
                    var t = document.createTextNode(job[f[j].class][k]);
                    x.appendChild(t);

                    l.appendChild(x);
                }
                rf.appendChild(l);
            }
            
            else{
                var x = document.createElement(f[j].name);
                x.setAttribute('class',f[j].class);
                x.innerHTML = job[f[j].class];
                rf.appendChild(x)
               // y.appendChild(x);

            }
            
        }
    }
    

    // view Jobs by Company Names
    function dataViewByCompany(str){
        var m = document.getElementsByClassName('container')[0];
        m.innerHTML = ''

        const company = [];

        (async function fetchJobsByTags(){
            const response = await fetch(url)
            const jobs = await response.json();


            for(let i = 0; i < jobs.length; i++){

                var y = document.createElement('div');
                y.setAttribute('class','jobs');
                const rf = document.createElement('div');
                rf.setAttribute('class','job_desc');


               if(jobs[i].company === str){
                   const rf = document.createElement('div');
                   rf.setAttribute('class','job_desc');
                   createElements(jobs[i], y, rf);
                   y.appendChild(rf);
                   m.appendChild(y);
               }

            }
            
        })();
    }

    //Get all Tags
    function getAllTags(){
        (async function getAll(){
            const response = await fetch(url).then(response => response.json())
            .then(data =>{
                console.log("data tags")
                getUniqueTags(data);
            });
        })()
    }
    getAllTags();


    /** Get Unique Tags */
    function getUniqueTags(data){
        const arr = []
        for(var i = 0; i < data.length; i++){

            for(var l  in data[i].tags){
                arr.push((data[i].tags[l]).toLowerCase());
            }

        } 

        console.log(arr.length);
        const e = document.getElementsByClassName('tags_section')[0];

        const arr_new = Array.from(new Set(arr))
        const div = document.createElement('div');
       arr_new.forEach(tag =>{
                //console.log(tag);
                const btn = document.createElement('button');
                const text = document.createTextNode(tag);
                btn.addEventListener('click',function(){
                    //event.preventDefault();
                    //const j = getByTagsName(tag);
                    //dataView(j);
                    getByTagsName(tag);
                })
                btn.appendChild(text);
                div.appendChild(btn);
               
        }) 
        e.appendChild(div);
    }

    /**Getting Tags By name */
    function  getByTagsName(tag){
        var m = document.getElementsByClassName('container')[0];
        m.innerHTML = ''
        const arr = [];

        (async function getTagsName(){
            const response = await fetch(url).then(response => response.json())
            .then(data =>{
                for(let i = 0; i < data.length; i++){
                  
                    for(let j in data[i].tags){

                        var y = document.createElement('div');
                        y.setAttribute('class','jobs');
                        const rf = document.createElement('div');
                        rf.setAttribute('class','job_desc');

                       if(data[i].tags[j] === tag){
                           const rf = document.createElement('div');
                           rf.setAttribute('class','job_desc');
                           createElements(data[i], y, rf);
                           y.appendChild(rf);
                           m.appendChild(y);
                       }
                    }
                }
            })
        })();
    }


    window.addEventListener('DOMContentLoaded',function(){
        listJobs();
    })


}







App();


