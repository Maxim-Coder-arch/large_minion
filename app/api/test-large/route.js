import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  let client = null;
  
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB || 'LargeMinion';
    
    console.log('Подключаемся к базе:', dbName);
    
    client = new MongoClient(uri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    await client.connect();
    const db = client.db(dbName);
    await db.command({ ping: 1 });
    const testResult = await db.collection('test').insertOne({
      message: 'Первое подключение к LargeMinion!',
      date: new Date(),
      success: true
    });
    
    return NextResponse.json({
      success: true,
      message: `Подключено к базе "${dbName}"`,
      database: dbName,
      collections: await db.listCollections().toArray().then(c => c.map(col => col.name)),
      testId: testResult.insertedId.toString()
    });
    
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({
      success: false,
      message: 'Ошибка подключения',
      error: error.message
    }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}