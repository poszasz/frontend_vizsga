import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  getMarketListings,
  makeOffer,
  getMyCards,
  createListing,
  deleteListing,
  getMyPendingOffers,
  deleteOffer,
  checkAuth,
  logout,
} from "../api";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import FilterButtons from "../components/FilterButtons";
import ListingCard from "../components/ListingCard";
import OfferCard from "../components/OfferCard";
import Modal from "../components/Modal";
import Card from "../components/Card";

export default function MarketPage() {
  const navigation = useNavigate();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [myPendingOffers, setMyPendingOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedUserCardId, setSelectedUserCardId] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showPostOfferModal, setShowPostOfferModal] = useState(false);
  const [selectedCardForListing, setSelectedCardForListing] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [showDeleteOfferConfirm, setShowDeleteOfferConfirm] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);

  // Szűrő állapot
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const verifyAuth = async () => {
      const { authenticated, user } = await checkAuth();
      if (!authenticated) {
        navigation("/login");
        return;
      }
      setUser(user);
      await Promise.all([loadListings(), loadMyCards(), loadMyPendingOffers()]);
      setLoading(false);
    };
    verifyAuth();
  }, [navigation]);

  useEffect(() => {
    applyFilter();
  }, [listings, filterType, user]);

  const loadMyPendingOffers = async () => {
    const res = await getMyPendingOffers();
    if (res.result) setMyPendingOffers(res.offers);
  };

  const applyFilter = () => {
    if (!user) return;

    let filtered = [...listings];
    switch (filterType) {
      case "mine":
        filtered = listings.filter((listing) => listing.seller_id === user.id);
        break;
      case "others":
        filtered = listings.filter((listing) => listing.seller_id !== user.id);
        break;
      default:
        filtered = listings;
    }
    setFilteredListings(filtered);
  };

  const loadListings = async () => {
    const res = await getMarketListings();
    if (res.result) setListings(res.listings);
  };

  const loadMyCards = async () => {
    const res = await getMyCards();
    if (res.result) {
      const availableCards = res.cards
        .filter((card) => !card.is_listed && !card.is_offered)
        .map((card) => ({
          ...card,
          user_card_id: card.user_card_id,
        }));
      setMyCards(availableCards);
    }
  };

  const handleMakeOffer = (listing) => {
    setSelectedListing(listing);
    setSelectedUserCardId(null);
    setShowOfferModal(true);
  };

  const handlePostOffer = () => {
    setSelectedCardForListing(null);
    setShowPostOfferModal(true);
  };

  const handleCreateListing = async () => {
    if (!selectedCardForListing) {
      alert("Please select a card to list");
      return;
    }

    const res = await createListing(selectedCardForListing.user_card_id);
    if (res.result) {
      alert("Listing created successfully!");
      setShowPostOfferModal(false);
      setSelectedCardForListing(null);
      await Promise.all([loadListings(), loadMyCards(), loadMyPendingOffers()]);
    } else {
      alert(res.message || "Failed to create listing");
    }
  };

  const handleDeleteClick = (listing) => {
    setListingToDelete(listing);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return;

    const res = await deleteListing(listingToDelete.listing_id);
    if (res.result) {
      alert("Listing deleted successfully!");
      setShowDeleteConfirm(false);
      setListingToDelete(null);
      await Promise.all([loadListings(), loadMyCards(), loadMyPendingOffers()]);
    } else {
      alert(res.message || "Failed to delete listing");
    }
  };

  const handleDeleteOfferClick = (offer) => {
    setOfferToDelete(offer);
    setShowDeleteOfferConfirm(true);
  };

  const handleDeleteOfferConfirm = async () => {
    if (!offerToDelete) return;

    const res = await deleteOffer(offerToDelete.offer_id);
    if (res.result) {
      alert("Offer cancelled successfully!");
      setShowDeleteOfferConfirm(false);
      setOfferToDelete(null);
      await Promise.all([loadMyPendingOffers(), loadMyCards()]);
    } else {
      alert(res.message || "Failed to delete offer");
    }
  };

  const handleOfferSubmit = async () => {
    if (!selectedUserCardId) {
      alert("Please select a card to offer");
      return;
    }

    const res = await makeOffer(selectedListing.listing_id, selectedUserCardId);
    if (res.result) {
      alert("Offer sent successfully!");
      setShowOfferModal(false);
      setSelectedListing(null);
      setSelectedUserCardId(null);
      await Promise.all([loadListings(), loadMyCards(), loadMyPendingOffers()]);
    } else {
      alert(res.message || "Failed to send offer");
    }
  };

  // Add hozzá ezt a hiányzó függvényeket:

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setListingToDelete(null);
  };

  const handleDeleteOfferCancel = () => {
    setShowDeleteOfferConfirm(false);
    setOfferToDelete(null);
  };

  const handleLogout = async () => {
    await logout();
    navigation("/");
  };

  const filterCounts = {
    all: listings.length,
    mine: listings.filter((l) => l.seller_id === user?.id).length,
    others: listings.filter((l) => l.seller_id !== user?.id).length,
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar title="Market" user={user} onLogout={handleLogout} />

      <div
        className="flex-grow-1 container-fluid p-4"
        style={{ overflowY: "auto", backgroundColor: "#f5f5f5" }}
      >
        {/* Szűrő sor */}
        <div className="row mb-4 align-items-center">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div style={{ width: "120px" }}></div>
            <FilterButtons
              filterType={filterType}
              setFilterType={setFilterType}
              counts={filterCounts}
            />
            <button
              style={{
                padding: "10px 25px",
                backgroundColor: "#000000",
                color: "white",
                border: "none",
                borderRadius: "30px",
                fontSize: "0.95rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                width: "120px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#333333")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000000")}
              onClick={handlePostOffer}
            >
              POST OFFER
            </button>
          </div>
        </div>

        {/* Saját függőben lévő offerek szekció */}
        {myPendingOffers.length > 0 && (
          <div className="row mb-4">
            <div className="col-12">
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "300",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                My Pending Offers ({myPendingOffers.length})
              </h3>
              <div className="row">
                {myPendingOffers.map((offer) => (
                  <div key={offer.offer_id} className="col-md-3 mb-4">
                    <OfferCard
                      offer={offer}
                      onDelete={handleDeleteOfferClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listings szekció */}
        <div className="row mb-4">
          <div className="col-12">
            <h3
              style={{ fontSize: "1.5rem", fontWeight: "300", color: "#333" }}
            >
              {filterType === "all" &&
                `All Listings (${filteredListings.length})`}
              {filterType === "mine" &&
                `My Listings (${filteredListings.length})`}
              {filterType === "others" &&
                `Others' Listings (${filteredListings.length})`}
            </h3>
          </div>
        </div>

        <div className="row">
          {filteredListings.map((listing) => (
            <div key={listing.listing_id} className="col-md-3 mb-4">
              <ListingCard
                listing={listing}
                user={user}
                onMakeOffer={handleMakeOffer}
                onDelete={handleDeleteClick}
              />
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center mt-5">
            <h4 style={{ fontSize: "2rem", fontWeight: "300", color: "#333" }}>
              No listings found
            </h4>
            <p style={{ color: "#666" }}>
              {filterType === "all" &&
                "Check back later or create your own listing!"}
              {filterType === "mine" &&
                "You don't have any active listings. Create one from your cards!"}
              {filterType === "others" &&
                "No other listings available at the moment."}
            </p>
          </div>
        )}
      </div>

      {/* Delete Listing Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={handleDeleteCancel}
        title="Delete Listing"
      >
        <p style={{ marginBottom: "20px", color: "#666", fontSize: "1rem" }}>
          Are you sure you want to delete your listing for{" "}
          <strong>
            {listingToDelete?.manufacturer} {listingToDelete?.name}
          </strong>
          ?
        </p>
        <p style={{ marginBottom: "25px", color: "#666", fontSize: "0.9rem" }}>
          This will remove it from the market and you can trade this card again.
        </p>
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
            onClick={handleDeleteCancel}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "10px 25px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
            onClick={handleDeleteConfirm}
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Delete Offer Modal */}
      <Modal
        isOpen={showDeleteOfferConfirm}
        onClose={handleDeleteOfferCancel}
        title="Delete Offer"
      >
        <p style={{ marginBottom: "20px", color: "#666", fontSize: "1rem" }}>
          Are you sure you want to delete your offer for{" "}
          <strong>
            {offerToDelete?.manufacturer} {offerToDelete?.name}
          </strong>
          ?
        </p>
        <p style={{ marginBottom: "25px", color: "#666", fontSize: "0.9rem" }}>
          This will remove the offer and you can use this card again.
        </p>
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
            onClick={handleDeleteOfferCancel}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "10px 25px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
            onClick={handleDeleteOfferConfirm}
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Offer Modal */}
      <Modal
        isOpen={showOfferModal}
        onClose={() => {
          setShowOfferModal(false);
          setSelectedListing(null);
          setSelectedUserCardId(null);
        }}
        title="Make an Offer"
      >
        <p style={{ marginBottom: "15px", color: "#666", fontSize: "0.95rem" }}>
          For:{" "}
          <strong style={{ color: "#000000" }}>
            {selectedListing?.manufacturer} {selectedListing?.name}
          </strong>
        </p>
        <h4 style={{ marginBottom: "12px", color: "#333", fontSize: "1.1rem" }}>
          Select a card to offer:
        </h4>
        <div
          style={{
            maxHeight: "250px",
            overflowY: "auto",
            marginBottom: "15px",
          }}
        >
          {myCards.length > 0 ? (
            myCards.map((card) => (
              <div
                key={card.user_card_id}
                style={{
                  padding: "12px",
                  margin: "8px 0",
                  border:
                    selectedUserCardId === card.user_card_id
                      ? "2px solid #000000"
                      : "1px solid #ddd",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedUserCardId === card.user_card_id
                      ? "#f5f5f5"
                      : "#ffffff",
                }}
                onClick={() => setSelectedUserCardId(card.user_card_id)}
                onMouseEnter={(e) => {
                  if (selectedUserCardId !== card.user_card_id) {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedUserCardId !== card.user_card_id) {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                      fontSize: "0.7rem",
                    }}
                  >
                    🚗
                  </div>
                  <div>
                    <strong style={{ color: "#333" }}>
                      {card.manufacturer} {card.name}
                    </strong>
                    <p
                      style={{
                        margin: "4px 0 0 0",
                        color: "#666",
                        fontSize: "0.8rem",
                      }}
                    >
                      {card.horsepower} HP | 0-100: {card.acceleration}s
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>
              You don't have any cards available to offer
            </p>
          )}
        </div>
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
            onClick={() => {
              setShowOfferModal(false);
              setSelectedListing(null);
              setSelectedUserCardId(null);
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "10px 25px",
              backgroundColor: selectedUserCardId ? "#000000" : "#cccccc",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: selectedUserCardId ? "pointer" : "not-allowed",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              if (selectedUserCardId)
                e.target.style.backgroundColor = "#333333";
            }}
            onMouseLeave={(e) => {
              if (selectedUserCardId)
                e.target.style.backgroundColor = "#000000";
            }}
            onClick={handleOfferSubmit}
            disabled={!selectedUserCardId}
          >
            Send Offer
          </button>
        </div>
      </Modal>

      {/* Post Offer Modal */}
      <Modal
        isOpen={showPostOfferModal}
        onClose={() => {
          setShowPostOfferModal(false);
          setSelectedCardForListing(null);
        }}
        title="Post a Listing"
      >
        <p style={{ marginBottom: "20px", color: "#666", fontSize: "1rem" }}>
          Select a card to put on the market
        </p>
        <h4 style={{ marginBottom: "15px", color: "#333", fontSize: "1.2rem" }}>
          Your available cards:
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginBottom: "25px",
            maxHeight: "500px",
            overflowY: "auto",
            padding: "5px",
          }}
        >
          {myCards.length > 0 ? (
            myCards.map((card) => (
              <div
                key={card.user_card_id}
                onClick={() => setSelectedCardForListing(card)}
                style={{
                  border:
                    selectedCardForListing?.user_card_id === card.user_card_id
                      ? "2px solid #000000"
                      : "1px solid #ddd",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <Card card={card} />
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <p style={{ color: "#666", fontSize: "1.1rem" }}>
                You don't have any cards available to list
              </p>
            </div>
          )}
        </div>
        <div
          style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}
        >
          <button
            style={{
              padding: "12px 25px",
              backgroundColor: "transparent",
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
            onClick={() => {
              setShowPostOfferModal(false);
              setSelectedCardForListing(null);
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "12px 30px",
              backgroundColor: selectedCardForListing ? "#000000" : "#cccccc",
              color: "white",
              border: "none",
              borderRadius: "30px",
              cursor: selectedCardForListing ? "pointer" : "not-allowed",
              fontSize: "1rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              if (selectedCardForListing)
                e.target.style.backgroundColor = "#333333";
            }}
            onMouseLeave={(e) => {
              if (selectedCardForListing)
                e.target.style.backgroundColor = "#000000";
            }}
            onClick={handleCreateListing}
            disabled={!selectedCardForListing}
          >
            POST OFFER
          </button>
        </div>
      </Modal>
    </div>
  );
}
