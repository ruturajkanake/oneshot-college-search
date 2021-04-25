export const chartColors = [
    '#e74c3c',
    '#3498db',
    '#ec407a',
    '#f57c00',
    '#ffeb3b',
    '#8bc34a',
    '#ab47bc',
    '#3f51b5',
    '#00FFFF',
    '#9575cd',
    '#663366',
    '#9999CC',
    '#CCCCCC',
    '#669999',
    '#CCCC66',
    '#CC6600',
    '#9999FF',
    '#0066CC',
    '#99CCCC',
    '#999999',
    '#FFCC00',
    '#009999',
    '#99CC33'
];

export const tagColors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
];

export const randomTagColor = () => {
    return tagColors[Math.floor(Math.random() * (tagColors.length - 0)) + 0];
};
