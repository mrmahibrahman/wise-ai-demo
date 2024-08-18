'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import Navbar from "../components/Navbar";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="100vw" sx={{ backgroundColor: "#1e1e1e", minHeight: "100vh", color: "#c5c6c7" }}>
            <Navbar />
            <Grid container spacing={3} sx={{ mt: 4, paddingBottom: 5, paddingTop: 2 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                        <Card sx={{ backgroundColor: "#282c34", color: "#61dafb", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: "monospace" }}>
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
