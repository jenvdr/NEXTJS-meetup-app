import MeetupDetail from "@component/components/meetups/MeetupDetail";
import { useRouter } from "next/router";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      title="First meetup"
      address="Some address 5, 123456, Milan"
      description="This is our first meetup point."
      image="https://imageio.forbes.com/specials-images/imageserve/636269102e3d4aa9da08fd12/0x0.jpg?format=jpg&width=420"
    />
  );
};

export async function getStaticPaths() {
     return {
        fallback: false,
        paths: [
            { 
                params: {
                    meetupId: 'm1',
                } 
            },
            { 
                params: {
                    meetupId: 'm2',
                } 
            },
        ]
     }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId; //meetupID = identifier used inside square brackets
    return {
        props: {
            meetupData: {
                id: meetupId,
                title:"First meetup",
                address:"Some address 5, 123456, Milan",
                description:"This is our first meetup point.",
                image:"https://imageio.forbes.com/specials-images/imageserve/636269102e3d4aa9da08fd12/0x0.jpg?format=jpg&width=420",
            }
        },
        revalidate: 10,
    }
}

export default MeetupDetails;
