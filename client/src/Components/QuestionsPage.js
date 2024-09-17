import React from "react";
import './awards.css';

function QuestionsPage(){
    return(
        <div>
            <h1 className="heading"><b>Frequently Asked Questions</b></h1>
            <ul>
                <li>Do you only deal with buying of houses or leasing as well?</li>
                <p>We offer both buying and leasing options for houses. Whether you're looking to own a home or rent, we have multiple listings to suit your needs.</p>
                <a href="/homepage">Learn More</a>

                <li>Do I get a chance to view the houses before any transactions are made?</li>
                <p>Yes, we encourage all clients to view the property in person or virtually before making any decisions.</p>
                <a href="/homepage">Learn More</a>

                <li>Can I be assisted by someone to guide me throughout the process?</li>
                <p>Absolutely! Our experienced agents are here to guide you through every step, from house viewing to finalizing transactions.</p>
                <a href="/homepage">Learn More</a>
                </ul>

        </div>
    );
};

export default  QuestionsPage;