import MeetupList from "@component/components/meetups/MeetupList";
import { MongoClient } from 'mongodb';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'First meetup',
//         image: 'https://imageio.forbes.com/specials-images/imageserve/636269102e3d4aa9da08fd12/0x0.jpg?format=jpg&width=1200',
//         address: 'Some address 5, 123456, Milan',
//         description: 'This is our first meetup point.'
//     },
//     {
//         id: 'm2',
//         title: 'Second meetup',
//         image: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/07/shutterstock_680171656.jpg',
//         address: 'Some address 10, 123456, Milan',
//         description: 'This is our second meetup point.'
//     },
//     {
//         id: 'm3',
//         title: 'Third meetup',
//         image: 'https://www.civitatis.com/f/italia/milan/guia/compras-m.jpg',
//         address: 'Some address 15, 123456, Milan',
//         description: 'This is our third meetup point.'
//     },
// ]

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