import NewMeetupForm from "@component/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log(`data new-meetup/index.js: ${JSON.stringify(data)}`);

        router.push('/');
    };

    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    );
};

export default NewMeetupPage;