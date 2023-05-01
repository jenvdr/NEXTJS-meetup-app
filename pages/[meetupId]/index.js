import MeetupDetail from "@component/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";


const MeetupDetails = (props) => {
  return (
    <Fragment>
        <Head>
          <title>{props.meetupData.title}</title>
          <meta name="description" content={props.meetupData.description} />
        </Head>
        <MeetupDetail
          title={props.meetupData.title}
          address={props.meetupData.address}
          description={props.meetupData.description}
          image={props.meetupData.image}
        />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jenvdr:pgz3nRMY530Xih5X@cluster0.c6z5nt5.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking', // If set to true it will generate a dynamic page for missing id
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; //meetupID = identifier used inside square brackets

  const client = await MongoClient.connect(
    "mongodb+srv://jenvdr:pgz3nRMY530Xih5X@cluster0.c6z5nt5.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
