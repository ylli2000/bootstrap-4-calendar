const StopEventPropagation = (e)=> {
    if (!e) return;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
};
export const Calendar = (id) => ({ 
    id: id,
    data: [],
    el: undefined,
    y: undefined,
    m: undefined,
    onDateClick(e) {
        StopEventPropagation(e);
        const el = e.srcElement;
        alert(el.textContent); 
        console.log('click'); 
        console.log(el);
    },
    onEventClick(e) {
        StopEventPropagation(e);
        const el = e.srcElement;
        alert(el.textContent); 
        console.log('click'); 
        console.log(el); 
    },
    bindData(events) {
        this.data = events.sort((a,b) => {
            if ( a.time < b.time ) return -1;
            if ( a.time > b.time ) return 1;
            return 0;
        });
    },
    renderEvents() {    
        if (!this.data || this.data.length<=0) return;
        const lis = this.el.querySelectorAll(`.${this.id} .days .inside`);
        let y = this.el.querySelector('.month-year .year').innerText;
        let m = lis[0].querySelector('.date').getAttribute('month');
        lis.forEach((li)=>{
            try {
                let d = li.innerText;
                let divEvents = li.querySelector('.events');
                li.onclick = this.onDateClick;
                this.data.forEach((ev)=>{
                    try {
                        let evTime = moment(ev.time);
                        if (evTime.year() == y && evTime.month() == m && evTime.date() == d) {
                            let frgEvent = document.createRange().createContextualFragment(`
                                <div time="${ev.time}" class="event ${ev.cls}">${evTime.format('h:mma')} ${ev.desc}</div>
                            `);
                            divEvents.appendChild(frgEvent);
                            let divEvent = divEvents.querySelector(`.event[time='${ev.time}']`);
                            divEvent.onclick = this.onEventClick;
                        }
                    } catch (err2) {
                        console.log(err2);
                    }
                });
            } catch (err1) {
                console.log(err1);
            }
        });
    },
    render(y, m) {
        //-------------------------------------------------------------------------------------------
        //first time when you call render() without params, it is going to default to current date.
        //this logic here is to make sure if you re-render by calling render() without any param again,
        //if the calendar is already looking at some other month, then it will get the updated data, but
        //the calendar will not jump back to current month and stay at the previous month you are looking at.
        //this is useful when server side has updated events, calendar can re-bindData() and re-render() 
        //itself correctly to reflect any changes.
        try {
            if (isNaN(y) && isNaN(this.y)) {
                this.y = moment().year();
            } else if ((!isNaN(y) && isNaN(this.y)) || (!isNaN(y) && !isNaN(this.y))) {
                this.y = y>1600 ? y : moment().year(); //calendar doesn't exist before 1600! :)
            }
            if (isNaN(m) && isNaN(this.m)) {
                this.m = moment().month();
            } else if ((!isNaN(m) && isNaN(this.m)) || (!isNaN(m) && !isNaN(this.m))) {
                this.m = m>=0 ? m : moment().month(); //momentjs month starts from 0-11
            }
            //------------------------------------------------------------------------------------------

            const d = moment().year(this.y).month(this.m).date(1); //first date of month
            const now = moment();
            const frgCal = document.createRange().createContextualFragment(`
            <div class="calendar noselect p-5">
                <div class="month-year-btn d-flex justify-content-center align-items-center mb-2">
                    <a class="prev-month"><i class="fas fa-caret-left fa-lg m-3"></i></a>
                    <div class="month-year d-flex justify-content-center align-items-center">
                        <div class="month mb-2 mr-2">${moment().month(this.m).format('MMMM')}</div>
                        <div class="year mb-2">${this.y}</div>
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
                    <li class="${d.add(1,'d'),this.m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                    <li class="${d.add(1,'d'),this.m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                    <li class="${d.add(1,'d'),this.m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                    <li class="${d.add(1,'d'),this.m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                    <li class="${d.add(1,'d'),this.m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                    <li class="${d.add(1,'d'),this.m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                    <li class="${d.add(1,'d'),this.m != d.month()?' outside':'inside'}${isSameDate(d,now)?' today':''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                </ol>
                `);
                frgCal.querySelector('.calendar').appendChild(frgWeek);
            }
            
            frgCal.querySelector('.prev-month').onclick = ()=>{
                const dp = moment().year(this.y).month(this.m).date(1).subtract(1, 'month');
                this.render(dp.year(), dp.month());
            };
            frgCal.querySelector('.next-month').onclick = ()=>{
                const dn = moment().year(this.y).month(this.m).date(1).add(1, 'month');
                this.render(dn.year(), dn.month());
            };
            this.el = document.getElementById(this.id);
            this.el.innerHTML = ''; //replacing
            this.el.appendChild(frgCal);
            this.renderEvents();
        } catch (error) {
            console.error(error);
        }
    }
});