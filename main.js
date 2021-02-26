const App = () =>{
     const url= "https://remoteok.io/api?";


    const f = [
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
            name: 'img',
            class: 'company_logo'
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

    (async function getJobs(){
        const d = await fetch(url)
                    .then(response => response.json())
                    .then(jobs => {
                       //console.log(jobs.length);
                    
                       dataView(jobs);
                    });   
                    
    })();



    function getFetchJobs(x){
        //console.log(x);
        document.body.innerHTML ='' ;
         (async function fetchJobsByTags(){
            const response = await fetch(x)
            const data = await response.json();
            //console.log(data);
            dataView(data);
            
        })();
    }


    function dataView(jobs){
        for(let i = 1; i < jobs.length; i++){
                            
            if(jobs[i].company === "" && jobs[i].company_logo === "" || jobs[i].url === ""){
                i+=1;
            }

            else{

                //console.log(jobs[i]);
                var y = document.createElement('div');
                y.setAttribute('class','jobs');

                
                for(let j = 0; j < f.length; j++){


                    if(f[j].class == 'company_logo'){
                        var dv = document.createElement('div');
                        dv.setAttribute('class','jobs_img');
                        dv.setAttribute('loading','lazy');
                        var x = document.createElement(f[j].name);
                        x.setAttribute('class',f[j].class);
                        x.setAttribute('src', jobs[i][f[j].class]);
                        dv.appendChild(x);
                        y.appendChild(dv);
                    }
                    else if(f[j].class == 'url'){
                        var x = document.createElement(f[j].name);
                        var btn = document.createElement('BUTTON');
                        var t = document.createTextNode("Apply");
                        btn.appendChild(t);
                        x.setAttribute('class',f[j].class);
                        x.setAttribute('href', jobs[i][f[j].class]);
                        x.setAttribute('target', '_blank');
                        x.appendChild(btn);
                        y.appendChild(x);
                    }
                    else if(f[j].class == 'tags'){
                        var l = document.createElement('ul')
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
                        y.appendChild(l);
                    }
                    
                    else{
                        var x = document.createElement(f[j].name);
                        x.setAttribute('class',f[j].class);
                        x.innerHTML = jobs[i][f[j].class];
                        y.appendChild(x);

                    }
                }
                document.body.appendChild(y);
            }                                
        }
    }

}



App();
    



