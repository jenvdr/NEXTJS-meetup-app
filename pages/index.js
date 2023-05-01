import MeetupList from "@component/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'First meetup',
        image: 'https://imageio.forbes.com/specials-images/imageserve/636269102e3d4aa9da08fd12/0x0.jpg?format=jpg&width=1200',
        address: 'Some address 5, 123456, Milan',
        description: 'This is our first meetup point.'
    },
    {
        id: 'm2',
        title: 'Second meetup',
        image: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/07/shutterstock_680171656.jpg',
        address: 'Some address 10, 123456, Milan',
        description: 'This is our second meetup point.'
    },
    {
        id: 'm3',
        title: 'Third meetup',
        image: 'https://www.civitatis.com/f/italia/milan/guia/compras-m.jpg',
        address: 'Some address 15, 123456, Milan',
        description: 'This is our third meetup point.'
    },
]

const HomePage = props => {
    return (
        <MeetupList meetups={props.meetups}/>
    );
};

export async function getStaticProps() {
    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
        revalidate: 10,
    };
};

export default HomePage;