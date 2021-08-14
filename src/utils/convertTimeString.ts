const convertTimeString = (timeString: string) => {
    let newTimeStringArray = new Date(timeString + 'T00:00').toDateString().split("");
    newTimeStringArray.splice(0, 4);
    newTimeStringArray.splice(6, 0, ',');
    newTimeStringArray.join("");
    return newTimeStringArray;
};

export default convertTimeString;