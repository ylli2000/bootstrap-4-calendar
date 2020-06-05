import {mockData} from './mockData.js';
import {Spinner} from './spinner.js';
import {Calendar} from './calendar.js';


document.addEventListener("DOMContentLoaded", async ()=>{
    const cal = Calendar('calendar');
    const spr = Spinner('calendar'); 
    await spr.renderSpinner().delay(0);
    cal.bindData(mockData);
    cal.render();
});