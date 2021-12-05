import NavBarC from '../components/NavBarC';
import SpringMassSystem from '../components/SpringMassSystem';

export default function SpringMassPage() {
    return (<div>
        <NavBarC />
        <div className="prose">
        <h1>Spring-mass second order system.</h1>
            <p>
                Click or drag the mass to see it moving!
                <br/>
                Here we simulate up to the third derivative at a rate of 60 calculations/second.
                <br/>
                To be implemented: Port state-space graphs, add parameter tuning (mass, drag and spring coefficients, time scale (1s becomes 1ms, for example))
            </p>
            </div>
        <SpringMassSystem/>
        </div>
    )
}