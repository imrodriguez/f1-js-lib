interface Props {
    day: string,
    month: string,
    year: string
}

const getDate = ({ day, month, year}:Props):string => {
    return `${day}-${month}-${year}`;
};

export { getDate };