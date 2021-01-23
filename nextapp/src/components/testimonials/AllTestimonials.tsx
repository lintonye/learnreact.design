import Head from 'next/head'
import React from 'react'
import Image from 'next/image'

function CustomerQuote({
  smallFonts,
  name,
  title,
  company,
  pictureName,
  nameLink,
  children,
}) {
  return (
    <div className="flex space-x-1">
      <div className="font-serif text-lg italic opacity-80" css={{ flex: 3 }}>
        {children}
      </div>
      <div className="text-right space-y-1" css={{ flex: 2 }}>
        <Image
          src={
            require(`@/assets/student-profile-photos/${pictureName}.jpg`)
              .default
          }
          width={150}
          height={150}
          className="rounded-full"
        />
        <div>{name}</div>
        <div>
          {title}
          {company && `, ${company}`}
        </div>
      </div>
    </div>
  )
}

const Tweets = () => (
  <div
    className="grid gap-4"
    css={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    }}
  >
    <Head>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </Head>
    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          This whole react.js thing is amazing. I’ve been learning and playing
          like crazy. Thanks{' '}
          <a href="https://twitter.com/lintonye?ref_src=twsrc%5Etfw">
            @lintonye
          </a>{' '}
          ! Now I’m hoping to take my new skills into framerX and potentially
          taking over the world.
        </p>
        &mdash; Tony Sciantarelli (@TSciant){' '}
        <a href="https://twitter.com/TSciant/status/1042933573609840640?ref_src=twsrc%5Etfw">
          September 21, 2018
        </a>
      </blockquote>
    </div>
    <div>
      <blockquote className="twitter-tweet" data-cards="hidden" data-lang="en">
        <p lang="en" dir="ltr">
          Loving the{' '}
          <a href="https://twitter.com/hashtag/FramerX?src=hash&amp;ref_src=twsrc%5Etfw">
            #FramerX
          </a>{' '}
          course by{' '}
          <a href="https://twitter.com/lintonye?ref_src=twsrc%5Etfw">
            @lintonye
          </a>{' '}
          I love Mr Skinny ❤️ The course is really funny, there is some real
          tricks that can save you a lot of time and have full power of this new{' '}
          <a href="https://twitter.com/hashtag/FramerX?src=hash&amp;ref_src=twsrc%5Etfw">
            #FramerX
          </a>
          . It works great on mobile, a good substitute of Netflix
          <span role="img" aria-label="smile">
            😘
          </span>
          . <a href="https://t.co/MQBD2YGnKe">https://t.co/MQBD2YGnKe</a>{' '}
          <a href="https://t.co/mtMEBiwC2e">pic.twitter.com/mtMEBiwC2e</a>
        </p>
        &mdash; Yin-Ho Chong @FramerLoupe (@yinhochong){' '}
        <a href="https://twitter.com/yinhochong/status/1045029750656446464?ref_src=twsrc%5Etfw">
          September 26, 2018
        </a>
      </blockquote>
    </div>
    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          Basically obsessed with the{' '}
          <a href="https://t.co/8YjYbwzVxX">https://t.co/8YjYbwzVxX</a>{' '}
          explanations of all things{' '}
          <a href="https://twitter.com/reactjs?ref_src=twsrc%5Etfw">@reactjs</a>{' '}
          ...all of the doodles{' '}
          <a href="https://twitter.com/lintonye?ref_src=twsrc%5Etfw">
            @lintonye
          </a>
        </p>
        &mdash; Hailey Pobanz (@HaileyTheGinger){' '}
        <a href="https://twitter.com/HaileyTheGinger/status/1010147839522099202?ref_src=twsrc%5Etfw">
          June 22, 2018
        </a>
      </blockquote>
    </div>
    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          Just started with{' '}
          <a href="https://twitter.com/lintonye?ref_src=twsrc%5Etfw">
            @lintonye
          </a>{' '}
          &#39;s &#39;React For Designers&#39; course to make myself ready for{' '}
          <a href="https://twitter.com/framer?ref_src=twsrc%5Etfw">@framer</a>{' '}
          X. <a href="https://t.co/xvUbKUthTq">https://t.co/xvUbKUthTq</a>
        </p>
        &mdash; Wart Burggraaf (@WartBurggraaf){' '}
        <a href="https://twitter.com/WartBurggraaf/status/1007549197099393025?ref_src=twsrc%5Etfw">
          June 15, 2018
        </a>
      </blockquote>
    </div>
    {/* <div>
  <blockquote className="twitter-tweet" data-lang="en">
    <p lang="en" dir="ltr">
      Just signed up learning react native course for designer by{" "}
      <a href="https://twitter.com/lintonye?ref_src=twsrc%5Etfw">
        @lintonye
      </a>{" "}
      <br />Let&#39;s see if this old dog can learn a new trick 😀
      *finger crossed<a href="https://twitter.com/hashtag/ReactNative?src=hash&amp;ref_src=twsrc%5Etfw">
        #ReactNative
      </a>
    </p>&mdash; Dicky J (@jiangd){" "}
    <a href="https://twitter.com/jiangd/status/1007681331147431937?ref_src=twsrc%5Etfw">
      June 15, 2018
    </a>
  </blockquote>
</div> */}
    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          What is React? Brilliant explanation for designers (make sure to
          switch &quot;Domo&#39;s&quot; hat{' '}
          <span role="img" aria-label="smile">
            🤠
          </span>
          ) <a href="https://t.co/CF5Csuhi4L">https://t.co/CF5Csuhi4L</a>{' '}
          <a href="https://twitter.com/hashtag/react?src=hash">#react</a>{' '}
          <a href="https://twitter.com/hashtag/design?src=hash">#design</a>
        </p>
        &mdash; Domain7 (@domain7){' '}
        <a href="https://twitter.com/domain7/status/874286463772504064">
          June 12, 2017
        </a>
      </blockquote>
    </div>

    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          What a fun way for us newbies to learn about{' '}
          <a href="https://twitter.com/hashtag/React?src=hash">#React</a>! =&gt;
          &quot;What is React? React terms in plain English and doodles&quot;{' '}
          <a href="https://t.co/UZ9mtx3Z6K">https://t.co/UZ9mtx3Z6K</a>
        </p>
        &mdash; Tiffany Du (@dusign){' '}
        <a href="https://twitter.com/dusign/status/875430601322528780">
          June 15, 2017
        </a>
      </blockquote>
    </div>

    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="fr" dir="ltr">
          Clean explanation and illustrations of what is React and it&#39;s côté
          concepts ~{' '}
          <a href="https://t.co/PtCs0bYs7u">https://t.co/PtCs0bYs7u</a>
        </p>
        &mdash; Jérémy Buget (@jbuget){' '}
        <a href="https://twitter.com/jbuget/status/874880691863003138">
          June 14, 2017
        </a>
      </blockquote>
    </div>

    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          come for the adorable drawings, stay for the writing{' '}
          <a href="https://t.co/Cymf8TkVVw">https://t.co/Cymf8TkVVw</a>
        </p>
        &mdash; brent (@notbrent){' '}
        <a href="https://twitter.com/notbrent/status/879487035655860224">
          June 26, 2017
        </a>
      </blockquote>
    </div>

    <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          Lovely simple guide to understand React by{' '}
          <a href="https://twitter.com/lintonye">@lintonye</a>{' '}
          <a href="https://t.co/O9QxXhtpXe">https://t.co/O9QxXhtpXe</a>
        </p>
        &mdash; Leonardo Galante (@leogln_){' '}
        <a href="https://twitter.com/leogln_/status/879718877390934017">
          June 27, 2017
        </a>
      </blockquote>
    </div>

    {/* <div>
      <blockquote className="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">
          cute/easy way to learn &quot;What is{' '}
          <a href="https://twitter.com/hashtag/React?src=hash">#React</a>
          ?&quot; <a href="https://t.co/5BAY3Oe5qI">https://t.co/5BAY3Oe5qI</a>
        </p>
        &mdash; Laura Silva (@oolalalauraa){' '}
        <a href="https://twitter.com/oolalalauraa/status/872888299517378560">
          June 8, 2017
        </a>
      </blockquote>
    </div> */}
  </div>
)

function Quotes() {
  return (
    <div
      className="grid gap-12"
      css={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
      }}
    >
      <CustomerQuote
        smallFonts
        company="Adidas"
        name="Edoardo Fusaro"
        pictureName="edo"
        title="UX designer"
      >
        Thanks for the course, I learned a lot and I never expected to be able
        to get to such a point in about a bit more than a month. I basically
        started from 0 knowledge about it.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        company="Pitch"
        name="Kevin Cannon"
        pictureName="kevinc"
        title="Product Designer"
      >
        I’ve seriously learned 10x more in the last 4 weeks than in the last 8
        months trying to learn Framer on my own, also quite a bit of React as a
        bonus. These 4 weeks will really stay with me for a long time! "
      </CustomerQuote>

      <CustomerQuote
        smallFonts
        name="Ryder Booth"
        title="UX Lead"
        company="Cisco"
        pictureName="ryder"
      >
        Linton’s tutorials are constructed very thoughtfully and string concepts
        together in a clear and useful way. Well worth the money and time
        investment to kick-start understanding how to work with both Framer-X
        and a good introduction to React.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Joshua Ulm"
        title="Group Vice President of Design"
        company="Oracle"
        pictureName="joshua"
      >
        The closer a designer is to the actual customer experience the better.
        <p>
          The learnreact.design videos are the perfect intro for designers
          looking to get a better understanding of React so they can take their
          designs to the next level. The courses are very easy to follow and
          give you all the tools you need to jump right in, see results fast,
          and understand how it all works.
        </p>
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Mushon Zer-Aviv"
        title="VP Design &amp; UX"
        company="Localize.city"
        pictureName="mushon"
      >
        Linton has a radical vision about design and development collaborations.
        Many tried before him, but none of them has Linton’s unique mix of
        skill, coherence, generosity and humor that comes across in every
        tutorial, video or code component he publishes.
        <p>Linton has a radical vision, and it’s contagious.</p>
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Carley Cooper"
        title="Designer"
        company="Architech"
        pictureName="carley"
      >
        Being a designer in the tech industry has opened my world to new tools
        and technologies. Learning React is something I've always wanted to
        learn and incorporate into my tool set, but I didn't know how.
        <p>
          Linton's program is simple to follow, with the content divided in a
          thoughtful manner. With this training, I feel very well rounded in my
          technical abilities as a designer today.
        </p>
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Nick Hart"
        title="Designer"
        company="Mondo Robot"
        pictureName="nick"
      >
        Linton is truly a great teacher. I came in having some front-end
        experience under my belt, but not with React. Linton does a great job
        explaining his thinking and communicating the lessons in a way that is
        most beneficial to the student. This is definitely worth the money if
        you enjoy React, FramerX, or want to improve your skills!
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Erik Drouhard"
        title="Senior Visual UX Designer"
        company="Nuance Communications "
        pictureName="erik-drouhard"
      >
        One of the few Framer X courses that goes into the details of code
        overrides and code components. Linton is easy to follow and I especially
        liked how he explained how to animate with async/await. Great content,
        highly recommended!
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Yin-Ho Chong"
        title="UX Designer"
        company="Thales Digital Factory"
        pictureName="yinho"
      >
        Learnt a lot with this lesson about Framer X and React. I acquired tips
        and original advice about this new design tool. But what’s really
        pleasant was that we learnt while having fun as the same time. Not only
        was the lesson interesting but Sensei Linton took his time to answer all
        of our questions.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Tony Sciantarelli"
        title="Sr. UX Designer"
        company="Marriott International"
        pictureName="ts-profile"
      >
        The learning experience with Linton is something magical, simple
        examples, great explanations, React is my friend now!
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Heidi Merscher"
        title="UI Designer"
        company="Magma Digital"
        pictureName="heidi"
      >
        Linton has built a really great course on React for designers. For one,
        you get the feeling that he's just a nice guy (of course - he's
        Canadian! :) - he doesn't talk down to you in the course or use a bunch
        of needless jargon, and he makes himself available for questions.
        <p>
          He's broken React down into bite-size chunks, using fun graphics and
          animations to illustrate key points (which as visual learners
          designers will appreciate). The course is well thought out and
          structured, including exercises in a coding environment that has
          everything set up for React.
        </p>
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Mustafa Alic"
        title="CTO"
        company="AWARE GmbH (Vienna, Austria)"
        pictureName="mustafa"
      >
        Besides the knowledge to create high-fidelity prototypes with React and
        Framer this course opens your mind for interdisciplinary thinking when
        it comes to code and design.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Dicky Juwono"
        title="UX designer"
        pictureName="dicky"
        nameLink="https://twitter.com/lpetkov"
      >
        If learning code is your nemesis like me, you should give Linton’s
        online course a shot. It helps me make a smooth painless entry to the
        world of coding.
        <p>
          As a UX / UI Designer I need to have understanding on the environment
          where the final product build, not so that I can code them myself, but
          so I can figure out the possibility and features that available so
          that I can design the product better. Being a designer for 30 years
          and never touch a single code, learning to code is my all time
          nemesis, until I found Linton’s Learn react online course.
        </p>
        <p>
          To be honest it took me a couple of weeks of hesitation to start my
          subscription. But after signup I’m so glad that I did. Linton’s
          teaching really do presented with designer in mind. It helps me passed
          my mental blocking of learning code.
        </p>
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Vince Kodikal"
        title="Product Designer"
        company="IQVIA"
        pictureName="vince"
      >
        My team at IQVIA was introduced to FramerX as the tool that would bridge
        the gap between designers and the dev team. However, I wasn’t too
        familiar with React and so I began looking for courses that were simple
        to follow. Most of them required me to have a lot of dev skills.
        <p>
          When I found the Framer + React course from Linton, I was really
          amazed. He explains concepts using simple story analogies and I can
          follow them easily. He also includes sample files with instructions
          how to modify them. Plus, he has small tests at the end of each
          lesson. It was very valuable in gaining knowledge of React and Framer
          X.
        </p>
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="George Otsubo"
        title="Senior product designer"
        company="ClassPass"
        pictureName="george"
      >
        Learning react was always intimidating for me. Linton’s courses are
        exactly what I was looking for. The courses are easy to follow with
        great examples and would highly recommend for any designer wanting to
        get into react.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Dominik Stec"
        title="Senior Designer"
        pictureName="dominik"
      >
        The learning experience with Linton is something magical, simple
        examples, great explanations, React is my friend now!
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Charlene Chen"
        title="UX Designer"
        company="Twitch"
        pictureName="charlene"
      >
        Linton really knows how to explain the basics and the essentials of
        programming to non-technical designers like me. His FramerX and React101
        videos show practical examples that helped me tremendously.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Kyle Werstein"
        title="Founder"
        company="Verdant Records"
        pictureName="kyle"
      >
        Linton's course empowers designers to help make foundational decisions
        that can make or break web and native apps. React has become ubiquitous
        as a Javascript framework and thanks to this course, I'm more capable
        than ever of building my own products.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Pablo Aguilar"
        title="UX Consultant"
        company="Bravo TV, NBC Universal"
        pictureName="pablo"
      >
        I think learning should be fun and challenging and Linton Ye delivers
        that experience.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Patrick Multani"
        title="Product Designer"
        pictureName="patrick"
      >
        This course is great at explaining react concept with visuals. The
        course is indeed different from other react course, it focusses on
        design more. I feel the combination of video, visuals, quizzes, the
        community help me learning react.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Lachezar Petkov"
        title="UX designer"
        pictureName="lachezar"
        nameLink="https://twitter.com/lpetkov"
      >
        I learned a lot from Linton’s React course. It’s not one of those
        courses where they just let you type along, only explaining the syntax.
        He explains some important concepts and foundamentals very well, makes
        things super clear for people with little programming experience. Thank
        you, Linton!
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Aida Paul"
        title="Product Designer"
        pictureName="aida"
      >
        Good pace, lots of examples and layman explanations helped me finally
        understand React. Thank you Linton!
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Lincoln Mitchell"
        title="Senior UX Architect"
        pictureName="lincoln"
      >
        Linton comes across like a really nice programmer that wants to help us
        designers.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Anthony Barbato"
        title="Lead Product Designer"
        pictureName="anthony"
      >
        The ability to see visuals that accompany the explanations are beyond
        helpful.
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Kaitlyn Vu"
        nameLink="https://twitter.com/KaitlynVu_"
        title="UX Designer"
        pictureName="kaitlyn"
      >
        Thank you for making it so easy to learn{' '}
        <span role="img" aria-label="smile">
          😊
        </span>
      </CustomerQuote>
      <CustomerQuote
        smallFonts
        name="Masood Sadri"
        title="Product Designer"
        pictureName="masood"
      >
        I read so many articles about ReactJS, but yours is very understandable
        because of your simple language.
      </CustomerQuote>
    </div>
  )
}

export const AllTestimonials = () => (
  <div className="space-y-16">
    <Quotes />
    <Tweets />
  </div>
)
