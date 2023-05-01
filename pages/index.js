import MeetupList from "@component/components/meetups/MeetupList";
import { MongoClient } from 'mongodb';

const HomePage = props => {
    return (
        <MeetupList meetups={props.meetups}/>
    );
};

export async function getStaticProps() {

    const client = await MongoClient.connect(
        'mongodb+srv://jenvdr:pgz3nRMY530Xih5X@cluster0.c6z5nt5.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    };
};

export default HomePage;