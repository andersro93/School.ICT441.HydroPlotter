import {State} from './state';
import {Probability} from './probability';
import {Timestep} from './timestep';

export class Plotdata {
  public Name: string;

  public States: State[] = [];

  public Probabilities: Probability[] = [];

  public Timesteps: Timestep[] = [];
}
