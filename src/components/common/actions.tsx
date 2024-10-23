"use client"
/**
 * ************************************************************************************************    _        _   _                  ____                                             _   
 *    / \   ___| |_(_) ___  _ __  ___ / ___|___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_ 
 *   / _ \ / __| __| |/ _ \| '_ \/ __| |   / _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ '_ \| __|
 *  / ___ \ (__| |_| | (_) | | | \__ \ |__| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_ 
 * /_/   \_\___|\__|_|\___/|_| |_|___/\____\___/|_| |_| |_| .__/ \___/|_| |_|\___|_| |_|\__|
                                                          |_|                               
 * ************************************************************************************************
 * @author Brooke Dixon
 * @version 1.0.0
 * @copyright 2025 Digital Initiatives, Inc.
 * @license MIT
 * ************************************************************************************************
 * ************************************************************************************************
 * 
 * This component is responsible for displaying the actions dropdown menu and handling user actions.
 * It includes functionality for removing, sharing, and hiding objects.
 * 
 * The component takes an array of actions and a data object as props.
 * The actions array can contain the following values:
 *   - remove: Used to remove an object from the user's favorites.
 *   - share: Used to share an object with others.
 *   - hide: Used to hide an object from the user's archive.
 *   - edit: Used to edit an object.
 *   - favorite: Used to add an object to the user's favorites.
 *   - like: 
 *   - dislike: 
 * 
 * The data object contains the following properties:
 *   - id: The ID of the object.
 *   - key: The key of the object.
 *   - type: The type of the object.
 *   - object: The object's name.
 *   - label: The label of the object.
 * 
 *  @Example
 *      // Import the ActionsComponent
 *      import { ActionsComponent } from "~/components/common";
 * 
 *      // Use the ActionsComponent in your component
 *      <ActionsComponent
 *          actions=
 *              {
 *                  // An array of strings representing the actions the user can perform on the object.
 *                  ['remove', 'share', 'hide', 'edit', 'favorite']
 *              }
 *          data=
 *              {
 *                  id: number, - The internaal ID of the object.  This should be generated by the database
 *                  key: string, - The key of the object.  This is typically the CUID or UUID of the object.
 *                  t   ype: string, - The type of the object.  This is typically the type or model of the database.  User submitted.
 *                  object: string, - The key identifying the object.  This is typically the CUID or UUID of the object.
 *                  label: string' - The label of the object.  This is typically the name or title of the object.  Used for notifications, etc.
 *              }
 *      />
 * 
 * @param actions An array of strings representing the actions the user can perform on the object.
 * @param data An object containing the necessary data for the actions.
 * 
 * @returns A React component that displays the actions dropdown menu and handles user actions.

 */

// Import React and other necessary modules
import * as React from "react";
import { useState } from "react";
import { api } from "~/trpc/react";

// Import UI components
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "~/components/ui/dialog";

// Helper functions
// const handleShare = () => {
//     alert('Share');
// };

// const handleEdit = (currentObject: string) => {
//     console.log(`Edit ${currentObject}`); // Placeholder for edit logic
// }


// Component props interface
interface ActionsComponentProps {
    actions: Array<"save" | "like" | "dislike" | "share" | "hide" | "edit" | "archive" | "favorite" | "remove">;
    data: {
        model: string;
        id: number;
        key: string;
        object: string;
        type: string;
        label: string;
    };
}

export default function ActionsComponent({ actions, data }: ActionsComponentProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);
    const [currentModel, setCurrentModel] = useState<string | null>(null);
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [currentType, setCurrentType] = useState<string | null>(null);
    const [currentObject, setCurrentObject] = useState<string | null>(null);

    /** Favorites
     * 
     * removeFavoriteMutation: A mutation to remove a favorite from the database.
     * removeFavorite: A function to remove a favorite from the database.
     * handleRemoveFavorite: A function to handle the removal of a favorite from the database.
     * handleAddFavorite: A function to handle the addition of a favorite to the database.
     * addFavorite: A function to add an object to your favorites collection
     *
     */

    const removeFavoriteMutation = api.favorite.delete.useMutation();
    const addFavoriteMutation = api.favorite.add.useMutation();

    const handleAddFavorite = async (currentType: string, currentObject: string) => {
        try {
            await addFavorite({
                type: currentType,
                object: currentObject
            });
            toast({
                variant: "default",
                title: `Successfully added ${currentObject} to your favorites`,
            });
            setOpenDialog(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error during removal:", error.message);
            } else {
                console.error("Unexpected error during removal:", error);
            }
        }
    };

    const removeFavorite = async (params: { id: number; key: string; type: string; object: string }) => {
        try {
            await removeFavoriteMutation.mutateAsync(params);
            console.log("Favorite removed successfully");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error removing favorite:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const addFavorite = async (params: { type: string; object: string; }) => {
        try {
            await addFavoriteMutation.mutateAsync(params);
            console.log("Favorite added successfully");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error adding favorite:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleRemoveFavorite = async () => {
        try {
            await removeFavorite({ id: currentId!, key: currentKey!, type: currentType!, object: currentObject! });
            setOpenDialog(false);

            toast({
                variant: "default",
                title: `Successfully removed ${currentObject}`,
            });
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error during removal:", error.message);
            } else {
                console.error("Unexpected error during removal:", error);
            }
        }
    };

    /** Saved 
     * 
     * removeSaveMutation: A mutation to remove a favorite from the database.
     * removeSave: A function to remove a favorite from the database.
     * handleRemoveSave: A function to handle the removal of a favorite from the database.
     * handleAddSave: A function to handle the addition of a favorite to the database.
     * addSave: A function to add an object to your favorites collection
     * 
     */

    const removeSaveMutation = api.save.delete.useMutation();
    const addSaveMutation = api.save.add.useMutation();

    const handleAddSave = async (currentType: string, currentObject: string) => {
        try {
            await addSave({
                type: currentType,
                object: currentObject,
                createdBy: "Brooke",
                updatedBy: "Brooke"
            });
            toast({
                variant: "default",
                title: `Successfully added ${currentObject} to your saved objects`,
            });
            setOpenDialog(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error during removal:", error.message);
            } else {
                console.error("Unexpected error during removal:", error);
            }
        }
    };

    const removeSave = async (params: { id: number; key: string; type: string; object: string }) => {
        try {
            await removeSaveMutation.mutateAsync(params);
            console.log("Save removed successfully");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error removing save:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const addSave = async (params: { type: string; object: string; createdBy: string; updatedBy: string; }) => {
        try {
            await addSaveMutation.mutateAsync(params);
            console.log("Save added successfully");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error adding save:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleRemoveSave = async () => {
        try {
            await removeSave({ id: currentId!, key: currentKey!, type: currentType!, object: currentObject! });
            setOpenDialog(false);

            toast({
                variant: "default",
                title: `Successfully removed ${currentObject}`,
            });
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error during removal:", error.message);
            } else {
                console.error("Unexpected error during removal:", error);
            }
        }
    };

    /** Liked 
     * 
     */

    /** Disliked
     * 
     */

    /** Archived
     * 
     */

    /** Shared
     * 
     */



    const handleActionClick = (action: string, data: { model: string, id: number, key: string, type: string, object: string, label: string }) => {
        setCurrentAction(action);
        setCurrentModel(data.model);
        setCurrentId(data.id);
        setCurrentKey(data.key);
        setCurrentType(data.type);
        setCurrentObject(data.object);


        if (action === 'remove' || action === 'share' || action === 'archive') {
            setOpenDialog(true);
        } else {
            setOpenDialog(false);
            if (action === 'favorite') {
                void handleAddFavorite(data.type, data.object); // Explicitly ignore promise
            } else if (action === 'save') {
                void handleAddSave(data.type, data.object); // Explicitly ignore promise
            } else if (action === 'share') {
                console.log('Share');
            }
        }
    };

    const getDialogDescription = (action: string): string => {
        switch (action) {
            case 'remove': return `Are you sure you want to remove ${currentObject}?`;
            case 'share': return `TODO: Share Panel`;
            case 'hide': return `Hide this ${currentObject}?`;
            case 'edit': return 'Edit this favorite';
            default: return '';
        }
    };

    const getDialogButtons = (action: string, model: string) => {
        switch (action) {
            case 'remove':
                return (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        { currentModel === "favorite" ? 
                            <Button
                                variant="destructive"
                                onClick={async () => {
                                    await handleRemoveFavorite();
                                    // setOpenDialog(false);
                                }}
                            >Remove</Button>
                            :
                            <Button
                                variant="destructive"
                                onClick={async () => {
                                    await handleRemoveSave();
                                    // setOpenDialog(false);
                                }}
                            >Remove</Button>
                        }
                        
                    </DialogFooter>
                );
            case 'share':
                return (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="default" onClick={() => setOpenDialog(false)}>Share</Button>
                    </DialogFooter>
                );
            case 'hide':
                return (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => setOpenDialog(false)}>Hide</Button>
                    </DialogFooter>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {actions.map((action, idx) => (
                        <DropdownMenuItem key={idx}>
                            <a
                                onClick={() => handleActionClick(action, {
                                    id: data.id,
                                    model: data.model,
                                    key: data.key,
                                    object: data.object,
                                    type: data.type,
                                    label: data.label
                                })}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900 capitalize"
                            >
                                {action}
                            </a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentAction}</DialogTitle>
                        <DialogDescription>{getDialogDescription(currentAction ?? "")}</DialogDescription>
                    </DialogHeader>
                    {getDialogButtons(currentAction ?? "", currentType ?? "")}
                </DialogContent>
            </Dialog>
        </>
    );
}