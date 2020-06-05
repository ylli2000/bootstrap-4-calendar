const StopEventPropagation = (e)=> {
    if (!e) return;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
};
export const Calendar = (id) => ({ 
    id: id,
    el: null,
    events: [], 
    onDateClick(e) {
        StopEventPropagation(e);
        const el = e.srcElement;
        console.log('click'); 
        console.log(el);
    },
    onEventClick(e) {
        StopEventPropagation(e);
        const el = e.srcElement;
        console.log('click'); 
        console.log(el); 
    },
    bindData(events) {
        this.events = events.sort((a,b) => {
            if ( a.time < b.time ) return -1;
            if ( a.time > b.time ) return 1;
            return 0;
        });
    },
    renderEvents() {    
        if (!this.events || this.events.length<=0) return;
        const lis = this.el.querySelectorAll(`.${this.id} .days .inside`);
        let y = this.el.querySelector('.month-year .year').innerText;
        let m = lis[0].querySelector('.date').getAttribute('month');
        lis.forEach((li)=>{
            let d = li.innerText;
            let divEvents = li.querySelector('.events');
            li.onclick = this.onDateClick;
            this. events.forEach((ev)=>{
                let evTime = moment(ev.time);
                if (evTime.year() == y && evTime.month() == m && evTime.date() == d) {
                    let frgEvent = document.createRange().createContextualFragment(`
                        <div time="${ev.time}" class="event ${ev.cls}">${evTime.format('h:mma')} ${ev.desc}</div>
                    `);
                    divEvents.appendChild(frgEvent);
                    let divEvent = divEvents.querySelector(`.event[time='${ev.time}']`);
                    divEvent.onclick = this.onEventClick;
                }
            });
        });
    },
    renderCalendar(y, m) {
        y = !isNaN(y) && y>1600 ? y : moment().year(); //calendar doesn't exist before 1600! :)
        m = !isNaN(m) && m>=0 ? m : moment().month(); //momentjs month starts from 0-11
        const d = moment().year(y).month(m).date(1); //first date of month
        const now = moment();
        const frgCal = document.createRange().createContextualFragment(`
        <div class="calendar noselect p-5">
            <div class="month-year-btn d-flex justify-content-center align-items-center mb-2">
                <a class="prev-month"><i class="fas fa-caret-left fa-lg m-3"></i></a>
                <div class="month-year d-flex justify-content-center align-items-center">
                    <div class="month mb-2 mr-2">${moment().month(m).format('MMMM')}</div>
                    <div class="year mb-2">${y}</div>
                </div>
                <a class="next-month"><i class="fas fa-caret-right fa-lg m-3" aria-hidden="true"></i></a>
            </div>
            <ol class="day-names list-unstyled">
                <li><h6 class="initials">Sun</h6></li>
                <li><h6 class="initials">Mon</h6></li>
                <li><h6 class="initials">Tue</h6></li>
                <li><h6 class="initials">Wed</h6></li>
                <li><h6 class="initials">Thu</h6></li>
                <li><h6 class="initials">Fri</h6></li>
                <li><h6 class="initials">Sat</h6></li>
            </ol>
        </div>
        `);
        const isSameDate = (d1, d2) => d1.format('YYYY-MM-DD') == d2.format('YYYY-MM-DD');
        let frgWeek;
        d.day(-1); //move date to the oldest Sunday, so that it lines up with the calendar layout
        for(let i=0; i<5; i++){ //loop thru 35 boxes on the calendar month
            frgWeek = document.createRange().createContextualFragment(`
            <ol class="days list-unstyled" week="${d.week()}">
                <li class="${d.add(1,'d'),m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1,'d'),m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1,'d'),m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1,'d'),m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1,'d'),m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1,'d'),m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1,'d'),m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
            </ol>
            `);
            frgCal.querySelector('.calendar').appendChild(frgWeek);
        }
        
        frgCal.querySelector('.prev-month').onclick = ()=>{
            const dp = moment().year(y).month(m).date(1).subtract(1, 'month');
            this.renderCalendar(dp.year(), dp.month());
        };
        frgCal.querySelector('.next-month').onclick = ()=>{
            const dn = moment().year(y).month(m).date(1).add(1, 'month');
            this.renderCalendar(dn.year(), dn.month());
        };
        this.el = document.getElementById(this.id);
        this.el.innerHTML = ''; //replacing
        this.el.appendChild(frgCal);
        this.renderEvents();
    }
});