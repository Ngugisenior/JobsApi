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
    
    listJobs();

    function listJobs(){
       // document.body.innerHTML ='';
        (async function getJobs(){
            const d = await fetch(url)
                .then(response => response.json())
                .then(jobs => {
                //console.log(jobs.length);
                dataView(jobs);
            });   
                        
        })();
    }



    function getFetchJobs(x){
        //document.body.innerHTML = '';
        //console.log(x);
       // m.innerHTML ='' ;
         (async function fetchJobsByTags(){
            const response = await fetch(x)
            const data = await response.json();
            //console.log(data);
            dataView(data);
            
        })();
    }


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
                for(let j = 0; j < f.length; j++){

                    
                    if(f[j].class == 'company_logo'){
                        var dv = document.createElement('div');
                        dv.setAttribute('class','jobs_img');
                        dv.setAttribute('loading','lazy');
                        var x = document.createElement(f[j].name);
                        x.setAttribute('class',f[j].class);
                        x.setAttribute('src', jobs[i][f[j].class]);
                        x.addEventListener('click',function(event){
                            event.preventDefault();
                            dataViewByCompany(jobs[i].company);
                        })
                        dv.appendChild(x);
                        //rf.appendChild(x)
                        y.appendChild(dv);
                    }
                    else if(f[j].class == 'url'){
                        var x = document.createElement(f[j].name);
                        var btn = document.createElement('BUTTON');
                        btn.setAttribute('class', 'apply');
                        var t = document.createTextNode("Apply");
                        btn.appendChild(t);
                        x.setAttribute('class',f[j].class);
                        x.setAttribute('href', jobs[i][f[j].class]);
                        x.setAttribute('target', '_blank');
                        x.appendChild(btn);
                        rf.appendChild(x);
                    }
                    else if(f[j].class == 'tags'){

                        var l = document.createElement('ul')
                        l.setAttribute('class', 'tags_list');

                        for(let k in jobs[i][f[j].class]){
                            var x = document.createElement(f[j].name);
                            x.setAttribute('class',f[j].class);
                            
                            x.addEventListener('click', function(event){
                                event.preventDefault();
                                var url_2 = url + "tags="+(jobs[i][f[j].class][k]).replace(/\s/g,'%20')
                                getFetchJobs(url_2);
                            });
                            var t = document.createTextNode(jobs[i][f[j].class][k]);
                            x.appendChild(t);

                            l.appendChild(x);
                        }
                        rf.appendChild(l);
                    }
                    
                    else{
                        var x = document.createElement(f[j].name);
                        x.setAttribute('class',f[j].class);
                        x.innerHTML = jobs[i][f[j].class];
                        rf.appendChild(x)
                       // y.appendChild(x);

                    }
                    
                }
                y.appendChild(rf);
                m.appendChild(y)

            }                                
        }
    }

    

    function dataViewByCompany(str){
        var m = document.getElementsByClassName('container')[0];
        m.innerHTML = ''

        const company = [];

        (async function fetchJobsByTags(){
            const response = await fetch(url)
            const jobs = await response.json();
            //console.log(jobs);
           
                //console.log(jobs[i]);

            for(let i = 0; i < jobs.length; i++){
                //console.log(jobs[i]);
                var y = document.createElement('div');
                y.setAttribute('class','jobs');
                const rf = document.createElement('div');
                rf.setAttribute('class','job_desc');


               if(jobs[i].company === str){
                   console.log(jobs[i]);
                   var y = document.createElement('div');
                   y.setAttribute('class','jobs');
                   const rf = document.createElement('div');
                   rf.setAttribute('class','job_desc')
                   for(let j = 0; j < f.length; j++){
   
                       
                       if(f[j].class == 'company_logo'){
                           var dv = document.createElement('div');
                           dv.setAttribute('class','jobs_img');
                           dv.setAttribute('loading','lazy');
                           var x = document.createElement(f[j].name);
                           x.setAttribute('class',f[j].class);
                           x.setAttribute('src', jobs[i][f[j].class]);
                           x.addEventListener('click',function(event){
                               event.preventDefault();
                               dataViewByCompany(jobs[i].company);
                           })
                           dv.appendChild(x);
                           //rf.appendChild(x)
                           y.appendChild(dv);
                       }
                       else if(f[j].class == 'url'){
                           var x = document.createElement(f[j].name);
                           var btn = document.createElement('BUTTON');
                           btn.setAttribute('class', 'apply');
                           var t = document.createTextNode("Apply");
                           btn.appendChild(t);
                           x.setAttribute('class',f[j].class);
                           x.setAttribute('href', jobs[i][f[j].class]);
                           x.setAttribute('target', '_blank');
                           x.appendChild(btn);
                           rf.appendChild(x);
                       }
                       else if(f[j].class == 'tags'){
                           var l = document.createElement('ul')
                           l.setAttribute('class', 'tags_list');
                           for(let k in jobs[i][f[j].class]){
                               //const li = document.createElement('a');
                               //li.setAttribute('href', url + "tags="+jobs[i][f[j].class][k]);
                               //li.setAttribute('target', '_blank');
                               var x = document.createElement(f[j].name);
                               x.setAttribute('class',f[j].class);
                               
                               x.addEventListener('click', function(event){
                                   event.preventDefault();
                                   var url_2 = url + "tags="+(jobs[i][f[j].class][k]).replace(/\s/g,'%20')
                                   getFetchJobs(url_2);
                               });
                               var t = document.createTextNode(jobs[i][f[j].class][k]);
                               x.appendChild(t);
                               //li.appendChild(x);
                               l.appendChild(x);
                           }
                           rf.appendChild(l)
                           //y.appendChild(l);
                       }
                       
                       else{
                           var x = document.createElement(f[j].name);
                           x.setAttribute('class',f[j].class);
                           x.innerHTML = jobs[i][f[j].class];
                           rf.appendChild(x)
                       }
                       
                   }
                   y.appendChild(rf);
                   m.appendChild(y);
                   
               }
            }
            
            
        })();
    }


}


window.addEventListener('DOMContentLoaded',function(){
    const m = document.createElement('main');
    m.setAttribute('class', 'container');
    document.body.appendChild(m);
    App();
})

