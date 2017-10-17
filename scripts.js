// (function(){    
    
    "use strict";

    var durations = {
        faster : "",
        fast: "",
        default: "" ,
        slow: "",
        slower: "",
    }

    var TimingGenerator = (function() {
        var minimumDuration = document.getElementById("minimum-duration"),
            interactionDuration = document.getElementById("interaction-duration"),
            elements = document.getElementsByClassName("demonstrator"),
            scale = document.getElementById("scale-selector"),
            scaleValue = scale.value,
            chartBody = document.getElementById("duration-chart"),
            json = document.getElementById("duration-json"),
            jsonContent;

        var publicAPI = {
            minimumDuration : minimumDuration,
            interactionDuration : interactionDuration,
            elements : elements,
            scale : scale,
            scaleValue: scaleValue,
            chartBody : chartBody,
            json : json,
            jsonContent: {},
            init : function() {
                var newChartContent;
                for (let i = 0, len = Object.keys(durations).length; i < len; i++) {
                    let row = document.createElement("tr");

                    let th = document.createElement("th");
                    th.setAttribute('headers', 'speed');
                    th.setAttribute('scope', 'row');
                    th.setAttribute('id', 'speed_'+ Object.keys(durations)[i-1]);
                    th.innerText = Object.keys(durations)[i];
                    
                    let td = document.createElement("td");
                    td.setAttribute('headers', 'duration speed_'+ Object.keys(durations)[i]);

                    row.appendChild(th);
                    row.appendChild(td);

                    chartBody.appendChild(row);
                }
            },
            updateDurations : function() {
                // update scale value
                scaleValue = scale.value;
                
                // set a duration to multiply over and over
                var baseDuration = minimumDuration.value;

                // get array of table elements
                var chartedElements = chartBody.getElementsByTagName("td");
                                
                // make it the first value in the series
                elements[0].style.animationDuration = baseDuration + "ms";
                chartedElements[0].innerText = baseDuration + "ms";
        
                // multiply each duration by scale
                for (let i = 0, len = elements.length; i < len; i++) {
                    let duration = Math.floor(baseDuration *= scaleValue) + "ms";

                    // update each ball
                    elements[i].style.animationDuration = duration;

                    // add to an object for JSON-ifying
                    durations[Object.keys(durations)[i]] = duration;
                    
                    // Object.keys(durations)[i] = duration;

                    // and update the chart
                    chartedElements[i].innerText = duration;
                }

                // Now update the JSON 
                jsonContent = JSON.stringify(durations, null, '\t');

                //and add it to the JSON area
                json.innerHTML = '"glossary":' + jsonContent;
            }                    
        }
        return publicAPI;
            
    })();

    // Now call that whenever the select chantes
    TimingGenerator.scale.addEventListener("change", TimingGenerator.updateDurations, false);

    TimingGenerator.minimumDuration.addEventListener("change", TimingGenerator.updateDurations, false);
        
    //build the table;
    TimingGenerator.init();

    // update the table and JSON contents
    TimingGenerator.updateDurations();
// })();