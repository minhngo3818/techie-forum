type State = { isState: boolean };
type SetState = { setState: () => void };
type Name = { name: string };
type Content = { content: string };
type ID = { keyId: string }; // handle tooltip id <objectType>-<id>
type Stats = { stat?: number };

export interface StateDuo extends State, SetState {}

export default interface ButtonInterface
  extends ID,
    Name,
    Content,
    Stats,
    State,
    SetState {}
