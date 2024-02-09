export async function createProject(projectTitle, projectDescription, imagePath, gddUrl, client, user){
    try{
        const {error} = await client.from("projects")
            .insert({
                title: projectTitle,
                description: projectDescription,
                image_path: imagePath,
                game_design_document_path: gddUrl,
                user_id: user.value.id
            });
        if(error) throw error;
       return 1;
    } catch (error) {
        console.error(error);
        if(error.message === 'duplicate key value violates unique constraint "unique_title"'){
            return 0;
        } else {
            return -1;
        }
    }
}

export async function deleteProject(projectTitle, client, user){
    try{
        const {error} = await client.from("projects")
            .delete()
            .eq('user_id', user.value.id)
            .eq('title', projectTitle)
        if(error) throw error;
        return 1;
    } catch(error){
        console.error(error);
        return 0;
    }
}

export async function handleImageUpload(event, client) {
    try {
        const file = event.target.files[0];
        const imageName = `${Date.now()}-${file.name}`;
        const path = `${imageName}`;

        const { data, error } = await client.storage.from("images").upload(path, file);
        if (error) throw error;
        return data.path;
    } catch (error) {
        console.error('Error uploading image:', error.message);
        return null;
    }
}

export async function getCurrentGame(projectTitle, client){
    try{
        const {data, error} = await client.from("projects")
            .select()
            .eq("title", projectTitle);
        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error(error.message);
    }
}

export function getProjectImage(imagePath, client) {
    const storage = client.storage;
    const {data} = storage.from("images")
        .getPublicUrl(imagePath);
    return data.publicUrl;
}

export async function getProjectOwner(userId, client){
    try{
        const {data, error} = await client.from("profiles")
            .select('username')
            .eq('id', userId)
            .single()
        if (error) throw error;
        return data.username;
    } catch (error) {
        console.error(error.message);
    }
}

export async function checkOwnership(projectTitle, client, user) {
    try {
        const {data, error} = await client.from("projects")
            .select('user_id')
            .eq('title', projectTitle)
            .single()
        if (error) throw error;
        if (data && data.user_id === user.value.id) {
            return [await getProjectOwner(data.user_id, client), true];
        } else {
            return [await getProjectOwner(data.user_id, client), false];
        }
    } catch (error) {
        console.error(error.message);
    }
}

export async function getUserProjects(userId, client){
    try{
        const { data, error } = await client
            .from("projects")
            .select()
            .eq("user_id", userId)
        if(error) throw error;
        return data || [];
    } catch (error){
        console.error(error);
        return [];
    }
}

export async function getAllProjects(userId, client){
    try{
        if(userId === undefined){
            const {data, error} = await client
                .from("projects")
                .select()
            if(error) throw error;
            return data || [];
        } else {
            const {data, error} = await client
                .from("projects")
                .select()
                .neq("user_id", userId)
            if(error) throw error;
            return data || [];
        }
    } catch(error){
        console.error(error);
        return [];
    }
}

export async function update(updateData, projectTitle, client){
    try{
        const {error} = await client.from("projects")
            .update(updateData)
            .eq('title', projectTitle);
        if(error) throw error;
        return 1;
    } catch (error){
        console.error(error);
        return 0;
    }
}