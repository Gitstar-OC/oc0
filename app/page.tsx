import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen  bg-background p-8">
      <Link href="/fonts" className="text-blue-500 hover:underline">
        Go to Fonts Page
      </Link>
      <Link href="/images" className="text-blue-500 hover:underline ml-4">
        Go to Images Page
      </Link>
      {/* <Link href="/budframe" className="text-blue-500 hover:underline ml-4">
      Learn to build your own docs framework
    </Link> */}

      <h1 className="text-primary  max-w-2xl mt-10 font-sans">
        This tools are like the ones in{" "}
        <a href="https://ray.so" className="text-blue-500 hover:underline">
          ray.so
        </a>{" "}
        but for editing images and try and pick a font quickly. I am travelling
        a lot just to get my visa and passport (completed 1000km and will be
        travlleing more than 5000km in the upcoming week for my visa
        appointments) so I cannot focus more on posting the devlogs rather I
        will improve it. 

        My complete travel is just completely occupied by trains followed by taxis / buses followed by interviews , checks and various other things. I also cannot record any things as I am not carrying anything along with me. 

       <br/ > 
        Hope you guys can understand this, I will post 2 final or 3 final devlogs about what the image editor does and what's the purpose of it along with budframe and other stuff. 

        (Also some of you guys won't believe that this is the length of my travel so I will attach all of my tickets and appoinment dates after everything is done / when I come to sf! )
      </h1>
    </div>
  );
}
