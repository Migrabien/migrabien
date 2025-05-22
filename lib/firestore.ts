import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  FieldValue
} from "firebase/firestore";
import { db } from "./firebase";

// Tipos de datos
export interface UserProfile {
  id: string;
  nombre: string;
  email: string;
  paisOrigen: string;
  paisDestino: string;
  motivoMigracion: string;
  nivelEducativo?: string;
  experienciaLaboral?: string;
  estadoDocumentos?: string;
  photoURL?: string;
  createdAt?: string | Timestamp | FieldValue;
  updatedAt?: string | Timestamp | FieldValue;
  authProvider?: string;
}

export interface ChecklistItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: string;
  completed: boolean;
  dueDate?: string | Timestamp;
  createdAt: string | Timestamp | FieldValue;
  updatedAt: string | Timestamp | FieldValue;
}

export interface CoachConversation {
  id: string;
  userId: string;
  messages: CoachMessage[];
  createdAt: string | Timestamp | FieldValue;
  updatedAt: string | Timestamp | FieldValue;
}

export interface CoachMessage {
  id: string;
  content: string;
  sender: 'user' | 'coach';
  timestamp: string | Timestamp | FieldValue;
}

// Funciones para gestionar usuarios
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error("Error al obtener perfil de usuario:", error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);
    
    // Añadir timestamp de actualización
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error("Error al actualizar perfil de usuario:", error);
    throw error;
  }
}

// Funciones para gestionar checklist
export async function getUserChecklist(userId: string): Promise<ChecklistItem[]> {
  try {
    const checklistQuery = query(
      collection(db, "checklist"),
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(checklistQuery);
    const items: ChecklistItem[] = [];
    
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as ChecklistItem);
    });
    
    return items;
  } catch (error) {
    console.error("Error al obtener checklist del usuario:", error);
    throw error;
  }
}

export async function addChecklistItem(item: Omit<ChecklistItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const newItem = {
      ...item,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "checklist"), newItem);
    return docRef.id;
  } catch (error) {
    console.error("Error al añadir item a checklist:", error);
    throw error;
  }
}

export async function updateChecklistItem(itemId: string, data: Partial<ChecklistItem>): Promise<void> {
  try {
    const itemRef = doc(db, "checklist", itemId);
    
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(itemRef, updateData);
  } catch (error) {
    console.error("Error al actualizar item de checklist:", error);
    throw error;
  }
}

export async function deleteChecklistItem(itemId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "checklist", itemId));
  } catch (error) {
    console.error("Error al eliminar item de checklist:", error);
    throw error;
  }
}

// Funciones para gestionar conversaciones con el coach
export async function getUserConversations(userId: string): Promise<CoachConversation[]> {
  try {
    const conversationsQuery = query(
      collection(db, "conversations"),
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(conversationsQuery);
    const conversations: CoachConversation[] = [];
    
    querySnapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() } as CoachConversation);
    });
    
    return conversations;
  } catch (error) {
    console.error("Error al obtener conversaciones del usuario:", error);
    throw error;
  }
}

export async function createConversation(userId: string, initialMessage: string): Promise<string> {
  try {
    const newConversation = {
      userId,
      messages: [{
        id: Date.now().toString(),
        content: initialMessage,
        sender: 'user',
        timestamp: serverTimestamp()
      }],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "conversations"), newConversation);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear conversación:", error);
    throw error;
  }
}

export async function addMessageToConversation(
  conversationId: string, 
  content: string, 
  sender: 'user' | 'coach'
): Promise<void> {
  try {
    const conversationRef = doc(db, "conversations", conversationId);
    const conversationDoc = await getDoc(conversationRef);
    
    if (!conversationDoc.exists()) {
      throw new Error("La conversación no existe");
    }
    
    const conversation = conversationDoc.data() as CoachConversation;
    const newMessage: CoachMessage = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: serverTimestamp()
    };
    
    const messages = [...conversation.messages, newMessage];
    
    await updateDoc(conversationRef, {
      messages,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error al añadir mensaje a la conversación:", error);
    throw error;
  }
}
