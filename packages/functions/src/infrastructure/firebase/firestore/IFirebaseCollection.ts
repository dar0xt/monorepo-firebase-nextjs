export abstract class IFirestoreCollection<T> {
  abstract get converter(): FirebaseFirestore.FirestoreDataConverter<T>
  abstract get collection(): FirebaseFirestore.CollectionReference<T>
}
