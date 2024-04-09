


export const getAllAttendance = async(setDays) => {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
            };
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/attendance`, requestOptions);
        console.log(`${process.env.REACT_APP_BACKEND_URL}api/attendance`);
        const responseData = await response.json();
        if (response.ok) {
            setDays(responseData.attendances)
        }else{
            console.log("error 1");
        }
    } catch (err) {
      console.log("error 2");
    }
};

