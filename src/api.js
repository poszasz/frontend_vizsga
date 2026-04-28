export const BASE = 'https://nodejs312.dszcbaross.edu.hu'

// ========== REGISZTRÁCIÓ ==========
export async function registration(email, username, password) {  
    try {
        console.log("Sending request to:", `${BASE}/registration`)
        console.log("Data:", {email, username, password})
        
        const res = await fetch(`${BASE}/registration`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({email, username, password})
        })
        
        console.log("Response status:", res.status)
        const data = await res.json()
        console.log("Response data:", data)
        
        if(!res.ok) return {result: false, message: data.message}   
        else return {result: true, message: data.message} 
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== BELÉPÉS ==========
export async function login(emailOrUsername, password) {
    try {
        console.log("Sending login data:", { emailOrUsername, password })
        
        const res = await fetch(`${BASE}/login`, {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ 
                usernameOrEmail: emailOrUsername,
                password: password 
            })
        })
        
        console.log("Login response status:", res.status)
        const data = await res.json()
        console.log("Login response data:", data)
        
        if(!res.ok) return {result: false, message: data.message}   
        else {
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
                console.log("User stored:", data.user)
            }
            return {result: true, message: data.message, user: data.user} 
        }
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== AUTENTIKÁCIÓ ELLENŐRZÉS (JAVÍTVA) ==========
export async function checkAuth() {
    try {
        const res = await fetch(`${BASE}/adataim`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        
        if (res.ok) {
            const data = await res.json()
            // Frissítsük a localStorage-t a szerverről kapott adatokkal
            localStorage.setItem('user', JSON.stringify(data))
            return { authenticated: true, user: data }
        } else {
            // Ha nem sikerült, töröljük a localStorage-t
            localStorage.removeItem('user')
            return { authenticated: false, user: null }
        }
    } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem('user')
        return { authenticated: false, user: null }
    }
}

// ========== KIJELENTKEZÉS ==========
export async function logout() {
    try {
        const res = await fetch(`${BASE}/logout`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        localStorage.removeItem('user')
        const data = await res.json()
        return { result: res.ok, message: data.message }
    } catch (error) {
        console.error("Logout error:", error)
        localStorage.removeItem('user')
        return { result: false, message: "Network error" }
    }
}

// ========== FELHASZNÁLÓNÉV MÓDOSÍTÁSA ==========
export async function updateUsername(newUsername) {
    try {
        const res = await fetch(`${BASE}/username`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ newUsername })
        });
        const data = await res.json();
        if (!res.ok) return { result: false, message: data.message };
        
        // Frissítsük a localStorage-t
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.username = newUsername;
        localStorage.setItem('user', JSON.stringify(user));
        
        return { result: true, message: data.message };
    } catch (error) {
        console.error("Fetch error:", error);
        return { result: false, message: "Network error: " + error.message };
    }
}

// ========== EMAIL MÓDOSÍTÁSA ==========
export async function updateEmail(newEmail) {
    try {
        const res = await fetch(`${BASE}/email`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ newEmail })
        });
        const data = await res.json();
        if (!res.ok) return { result: false, message: data.message };
        
        // Frissítsük a localStorage-t
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.email = newEmail;
        localStorage.setItem('user', JSON.stringify(user));
        
        return { result: true, message: data.message };
    } catch (error) {
        console.error("Fetch error:", error);
        return { result: false, message: "Network error: " + error.message };
    }
}

// ========== JELSZÓ MÓDOSÍTÁSA ==========
export async function updatePassword(nowPassword, newPassword) {
    try {
        const res = await fetch(`${BASE}/password`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ nowPassword, newPassword })
        });
        const data = await res.json();
        if (!res.ok) return { result: false, message: data.message };
        return { result: true, message: data.message };
    } catch (error) {
        console.error("Fetch error:", error);
        return { result: false, message: "Network error: " + error.message };
    }
}


// ========== FELHASZNÁLÓ TÖRLÉSE ==========
export async function deleteAccount() {
    try {
        const token = localStorage.getItem('token'); // Vedd ki a token-t
        console.log("Token exists:", !!token); // Debug
        
        const res = await fetch(`${BASE}/account`, {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // ADD EZT!
            }
        });
        
        console.log("Response status:", res.status); // Debug
        
        const data = await res.json();
        console.log("Response data:", data); // Debug
        
        if (!res.ok) {
            return { result: false, message: data.message || "Delete failed" };
        }
        
        // Töröljük a localStorage-t
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Token-t is töröld
        
        return { result: true, message: data.message };
    } catch (error) {
        console.error("Fetch error:", error);
        return { result: false, message: "Network error: " + error.message };
    }
}

// ========== SAJÁT KÁRTYÁK LEKÉRÉSE ==========
export async function getMyCards() {
    try {
        const res = await fetch(`${BASE}/my-cards`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message, cards: []}
        else return {result: true, cards: data.cards || []}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message, cards: []}
    }
}

// ========== PACKOK LEKÉRÉSE ==========
export async function getMyPacks() {
    try {
        const res = await fetch(`${BASE}/my-packs`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message, packs: 0}
        else return {result: true, packs: data.packs || 0}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message, packs: 0}
    }
}

// ========== PACK NYITÁS ==========
export async function openPack() {
    try {
        const res = await fetch(`${BASE}/open-pack`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message}
        else return {result: true, card: data.card}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== MARKET LISTINGOK LEKÉRÉSE ==========
export async function getMarketListings() {
    try {
        const res = await fetch(`${BASE}/market-listings`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message, listings: []}
        else return {result: true, listings: data.listings || []}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message, listings: []}
    }
}

// ========== ÚJ LISTING LÉTREHOZÁSA ==========
export async function createListing(userCardId) {
    try {
        const res = await fetch(`${BASE}/create-listing`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ userCardId })
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message}
        else return {result: true, message: data.message, listingId: data.listingId}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== AJÁNLAT TÉTELE ==========
export async function makeOffer(listingId, offeredUserCardId) {
    try {
        const res = await fetch(`${BASE}/make-offer`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ listingId, offeredUserCardId })
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message}
        else return {result: true, message: data.message, offerId: data.offerId}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== SAJÁT FÜGGŐBEN LÉVŐ OFFEREK LEKÉRÉSE ==========
export async function getMyPendingOffers() {
    try {
        const res = await fetch(`${BASE}/my-pending-offers`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message, offers: []}
        else return {result: true, offers: data.offers || []}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message, offers: []}
    }
}

// ========== AJÁNLAT ELFOGADÁSA ==========
export async function acceptOffer(offerId) {
    try {
        const res = await fetch(`${BASE}/accept-offer/${offerId}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message}
        else return {result: true, message: data.message}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== SAJÁT LISTINGEK LEKÉRÉSE ==========
export async function getMyListings() {
    try {
        const res = await fetch(`${BASE}/my-listings`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message, listings: []}
        else return {result: true, listings: data.listings || []}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message, listings: []}
    }
}

// ========== LISTING TÖRLÉSE ==========
export async function deleteListing(listingId) {
    try {
        const res = await fetch(`${BASE}/listing/${listingId}`, {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message}
        else return {result: true, message: data.message}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== OFFER TÖRLÉSE ==========
export async function deleteOffer(offerId) {
    try {
        const res = await fetch(`${BASE}/offer/${offerId}`, {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message}
        else return {result: true, message: data.message}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== BEÉRKEZŐ AJÁNLATOK LEKÉRÉSE ==========
export async function getIncomingOffers() {
    try {
        const res = await fetch(`${BASE}/incoming-offers`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message, offers: []}
        else return {result: true, offers: data.offers || []}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message, offers: []}
    }
}

// ========== AJÁNLAT ELUTASÍTÁSA ==========
export async function rejectOffer(offerId) {
    try {
        const res = await fetch(`${BASE}/reject-offer/${offerId}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(!res.ok) return {result: false, message: data.message}
        else return {result: true, message: data.message}
    } catch (error) {
        console.error("Fetch error:", error)
        return {result: false, message: "Network error: " + error.message}
    }
}

// ========== ÉRTESÍTÉSEK LEKÉRÉSE ==========
export async function getNotifications() {
    try {
        const res = await fetch(`${BASE}/notifications`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if(!res.ok) return {result: false, message: data.message, notifications: []};
        else return {result: true, notifications: data.notifications || []};
    } catch (error) {
        console.error("Fetch error:", error);
        return {result: false, message: "Network error: " + error.message, notifications: []};
    }
}

// ========== ÉRTESÍTÉS MEGJELÖLÉSE OLVASOTTKÉNT ==========
export async function markNotificationAsRead(notificationId) {
    try {
        const res = await fetch(`${BASE}/notifications/${notificationId}/read`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if(!res.ok) return {result: false, message: data.message};
        else return {result: true, message: data.message};
    } catch (error) {
        console.error("Fetch error:", error);
        return {result: false, message: "Network error: " + error.message};
    }
}

// ========== ÖSSZES ÉRTESÍTÉS MEGJELÖLÉSE OLVASOTTKÉNT ==========
export async function markAllNotificationsAsRead() {
    try {
        const res = await fetch(`${BASE}/notifications/read-all`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if(!res.ok) return {result: false, message: data.message};
        else return {result: true, message: data.message};
    } catch (error) {
        console.error("Fetch error:", error);
        return {result: false, message: "Network error: " + error.message};
    }
}
