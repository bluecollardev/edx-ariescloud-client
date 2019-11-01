/*
  Connection state of the relationship / invitation objects.
*/

export type ConnectionStateType =
  | 'init'
  | 'invitation'
  | 'request'
  | 'response'
  | 'active'
  | 'error'
  | 'inactive';

export type InitiatorType = 'self' | 'external';

/*
  Parameters that can be passed to the invitations route
  or to the relationships route.

*/

export interface IConnectionParams {
  alias?: string;
  initiator?: InitiatorType;
  invitation_key?: string;
  my_did?: string;
  state?: ConnectionStateType;
  their_did?: string;
  their_role?: string;
}

/* The id is the connection Id.
  this is required for responding to certain state
  of the relationship or invitation

*/

export interface IRelationshipResponse {
  state: ConnectionStateType;
  initiator: InitiatorType;
  name?: string;
  did: string;
  _id: string;
}
