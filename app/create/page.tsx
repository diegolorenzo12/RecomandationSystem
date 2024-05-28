'use client'
import React, { useState, useEffect } from 'react';
import { Card,Image, CardBody, CardHeader, Input, Textarea, Button, ScrollShadow, Autocomplete, AutocompleteSection, AutocompleteItem, Spinner} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {useAsyncList} from "@react-stately/data";


// Define the Tag type
type Tag = {
  idTag: number;
  name: string;
};

export default function CreateConference() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const router = useRouter();
  const [autocompleteValue, setAutocompleteValue] = useState();

  useEffect(() => {
    async function fetchTags() {
      try{
        const response = await axios.get('http://localhost:5107/api/Tags/alltags');
        setTags(response.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchTags();
  }, []);

  const handleTagChange = (tagId: number) => {
    if(tagId === undefined || tagId<=0 ){
        return;
    }
    setSelectedTags(prevTags => {
      const updatedTags = prevTags.includes(tagId) ? prevTags.filter(id => id !== tagId) : [...prevTags, tagId];
      console.log('Updated Tags:', updatedTags); // Log the updated tags
      return updatedTags;
    });
  };

  const handleSubmit = async () => {
    const conference = new FormData();
    conference.append('name', name);
    conference.append('description', description);
    conference.append('location', location);
    conference.append('imageUrl', imageUrl);
    conference.append('time', time);

    // Append each tagId separately
    selectedTags.forEach(tagId => {
      conference.append('tagIds', tagId.toString()); // Convert number to string
    });

    try {
      const response = await axios.post('http://localhost:5107/api/Conferences', conference, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      router.push('/recomendations'); // Redirect to the conferences page after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTag = async (name: string)=>{
    console.log(name);
    const newTag = new FormData();
    newTag.append('tagName', name);

    const response = await axios.post("http://localhost:5107/api/Tags/add", newTag, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    const data: Tag = response.data;
    tags.push(data);
    handleTagChange(data.idTag);
  }

  let list = useAsyncList<Tag>({
    async load({signal, filterText}) {
        try {

            let res = await fetch(`http://localhost:5107/api/Tags/paginated?name=${filterText}`, { signal });
            let json = await res.json();
    
            // Ensure the response has a results array
            if (!Array.isArray(json.results)) {
              throw new Error('Invalid response structure');
            }
    
            return {
              items: json.results,
            };
        } catch (error) {
            console.error("Failed to load tags", error);
            return { items: [] };
        }
    },
  });


  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-3/5 bg-dark m-3 p-6 shadow-2xl dark">
        <CardHeader>
          <h1 className="text-white text-2xl font-bold">Create Your Own Conference</h1>
        </CardHeader>
        <CardBody className="flex flex-col justify-center items-center text-white">
          <Input
            type="text"
            label="Conference Name"
            placeholder="Enter conference name"
            variant="faded"
            className="my-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            label="Description"
            placeholder="Enter conference description"
            variant="faded"
            className="my-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="text"
            label="Image URL"
            placeholder="Enter image URL"
            variant="faded"
            className="my-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          {imageUrl && 
          <>
            <Image src={imageUrl} alt="preview" width={240} />
          </>

          }
          <Input
            type="datetime-local"
            label=""
            variant="faded"
            className="my-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <Input
            type="text"
            label="Location"
            placeholder="Enter location"
            variant="faded"
            className="my-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <div className="flex items-center gap-2 w-full">
            <Autocomplete
              className="text-white flex-grow"
              inputValue={list.filterText}
              isLoading={list.isLoading}
              items={list.items}
              label="Search for tags"
              placeholder="Type to search..."
              variant="faded"
              allowsCustomValue
              onInputChange={list.setFilterText}
              onSelectionChange={(key) => handleTagChange(Number(key))}
            >
              {(item) => (
                <AutocompleteItem key={item.idTag}>
                  {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            {list.items.length === 0 && list.filterText && (
              <Button onPress={()=>handleCreateTag(list.filterText)}>Create &quot;{list.filterText}&quot;</Button>
            )}
          </div>
          
          {selectedTags.length>0 &&
          <>
            <label className="text-white w-full my-2">Selected Tags</label>
            <ScrollShadow orientation='horizontal' className='h-[90px] w-full overflow-x-auto flex flex-nowrap gap-3 flex-row'>
                {selectedTags.map(tagId => (
                <Button
                    key={tagId}
                    size='md'
                    className="bg-blue-500 text-white overflow-hidden flex-shrink-0"
                    onClick={() => handleTagChange(tagId)}
                >
                    {
                        tags.filter(tag => tag.idTag === tagId)[0].name
                    }
                </Button>
                ))}
            </ScrollShadow>  
          </>
          }
          <label className="text-white w-full my-2">All Tags</label>
          {
            Array.isArray(tags) && tags.length>0 ? (
                <ScrollShadow className='h-[300px] w-full flex flex-wrap gap-2'>
                    {tags.map(tag => (
                    <Button
                        key={tag.idTag}
                        className={`px-4 py-2 rounded ${selectedTags.includes(tag.idTag) ? 'bg-blue-500 text-white' : 'bg-gray-500'}`}
                        onClick={() => handleTagChange(tag.idTag)}
                    >
                        {tag.name}
                    </Button>
                    ))}
                </ScrollShadow>
            ): (<Spinner></Spinner>)
          }
          <Button className="w-1/2 my-2 mt-4 bg-lightdark text-white" onPress={handleSubmit}>
            Create Conference
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
