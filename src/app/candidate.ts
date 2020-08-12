export interface Candidate {

    id: number;
    name: String ;
    numChallenge: number;
    expLevel: number;
    expertise: Map<String,number>;
    votes: number;

}
