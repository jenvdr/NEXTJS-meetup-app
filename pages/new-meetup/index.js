import NewMeetupForm from "@component/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

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

        router.push('/');
    };

    return (
        <Fragment>
            <Head>
                <title>Add a new meetup point</title>
                <meta name="description" content="Add your own meetups." />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    );
};

export default NewMeetupPage;