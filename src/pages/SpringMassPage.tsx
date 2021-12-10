import NavBarC from '../components/NavBarC';
import SpringMassSystem from '../components/SpringMassSystem';

export default function SpringMassPage() {
    return (<div>
        <NavBarC />
        <div className="container mx-auto prose max-w-max border">
            <div className="prose mx-auto max-w-none">
            <h1>Spring-mass second order system</h1>
            <p>
                Click or drag the mass to see it moving!
                <br/>
                Here we simulate up to the third derivative at a rate of 60 calculations/second.
                <br/>
                To be implemented: state-space graphs
            </p>
            </div>
            <SpringMassSystem/>
        </div>
        </div>
    )
}