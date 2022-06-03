const ym0 = moment().format('YYYY-MM');
const ym1 = moment().subtract(1, 'month').format('YYYY-MM');
const ym2 = moment().add(1, 'month').format('YYYY-MM');
export const mockData = [
    {
        time: ym0 + '-13T21:00:00 Z',
        cls: 'bg-orange-alt',
        desc: 'Jack, Stephen'
    },
    {
        time: ym0 + '-13T22:00:00 Z',
        cls: 'bg-green-alt',
        desc: 'Nathan, Luke'
    },
    {
        time: ym0 + '-18T21:00:00 Z',
        cls: 'bg-red-alt',
        desc: 'Nathan, Stephen' 
    },
    {
        time: ym0 + '-18T22:00:00 Z',
        cls: 'bg-cyan-alt',
        desc: 'Peter, Luke'
    },
    {
        time: ym0 + '-18T23:00:00 Z',
        cls: 'bg-purple-alt',
        desc: 'Lora, Sandy'
    },
    {
        time: ym0 + '-19T20:00:00 Z',
        cls: 'bg-sky-blue-alt',
        desc: 'Nathan, Luke'
    },
    {
        time: ym0 + '-19T19:00:00 Z',
        cls: 'bg-orange-alt',
        desc: 'Peter, Luke'
    },
    {
        time: ym1 + '-02T20:00:00 Z',
        cls: 'bg-orange-alt',
        desc: 'Peter, Luke'
    },
    {
        time: ym1 + '-03T21:00:00 Z',
        cls: 'bg-sky-blue-alt',
        desc: 'Peter, Lora'
    },
    {
        time: ym1 + '-03T18:00:00 Z',
        cls: 'bg-orange-alt',
        desc: 'Sandy, Lora'
    },
    {
        time: ym2 + '-02T19:00:00 Z',
        cls: 'bg-purple-alt',
        desc: 'Peter, Luke'
    }
];