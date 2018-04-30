import {Probability} from './probability';

export class Timestep {
  public Label: string;

  public Probabilities: Probability[] = [];

  public Predicted: Number;

  public Observed: Number;
}
