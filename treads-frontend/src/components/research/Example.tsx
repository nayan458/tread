import axiosInstance from "@api/AxiosInsctance";


const ExampleComponent = () => {
    const handleSubmit = async () => {
        try {
            // const response = await axiosInstance.get('/')
            const formData = new FormData();
            formData.append('gene','UGT1A9');
            formData.append('search_id','GeneName');
            const response = await axiosInstance.post('/result', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return <button onClick={handleSubmit}>Submit</button>;
};

export default ExampleComponent;